import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, GraduationCap, User, Settings, ChevronDown, ChevronRight, Palette, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CURRICULUM from '../data/curriculum';
import StreakTracker from './StreakTracker';

export default function Sidebar() {
  const { state, getCurrentMonth, isMonthUnlocked } = useApp();
  const location = useLocation();
  const [expandedYear, setExpandedYear] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentMonth = getCurrentMonth();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/curriculum', icon: Map, label: 'Curriculum Map' },
    { to: '/profile', icon: User, label: 'My Portfolio' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const year1Months = CURRICULUM.filter(m => m.year === 1);
  const year2Months = CURRICULUM.filter(m => m.year === 2);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 60, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'none' }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 49 }}
        />
      )}

      <nav className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--color-gold-dim), var(--color-gold))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Palette size={18} color="#0e0e12" />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1rem', color: 'var(--color-text-primary)', lineHeight: 1 }}>The Atelier</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Fine Art Academy</p>
            </div>
          </div>
          {state.studentName && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-dim), var(--color-surface-3))', border: '1px solid var(--color-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700', color: 'var(--color-gold-bright)', flexShrink: 0 }}>
                {state.studentName[0]?.toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{state.studentName}</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Month {currentMonth} · Year {currentMonth <= 12 ? 1 : 2}</p>
              </div>
            </div>
          )}
        </div>

        {/* Streak (compact) */}
        <div style={{ padding: '12px 20px 0' }}>
          <StreakTracker compact />
        </div>

        {/* Main Nav */}
        <div style={{ marginTop: '8px' }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
              end={to === '/'}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Course Navigation */}
        <div style={{ marginTop: '8px', flex: 1 }}>
          {/* Year 1 */}
          <button
            onClick={() => setExpandedYear(expandedYear === 1 ? null : 1)}
            className="sidebar-item"
            style={{ justifyContent: 'space-between', width: '100%' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <GraduationCap size={14} /> Year I · Foundation
            </span>
            {expandedYear === 1 ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {expandedYear === 1 && year1Months.map(m => {
            const unlocked = isMonthUnlocked(m.month);
            const isCurrent = m.month === currentMonth;
            const isActive = location.pathname.includes(`/classroom/m${m.month}`);
            return (
              <NavLink
                key={m.month}
                to={unlocked ? `/classroom/m${m.month}?tab=lessons` : '#'}
                onClick={(e) => { if (!unlocked) { e.preventDefault(); } else { setMobileOpen(false); } }}
                style={{ textDecoration: 'none' }}
              >
                <div className={`sidebar-item sidebar-month-item ${isActive ? 'active' : ''}`} style={{ opacity: unlocked ? 1 : 0.4, cursor: unlocked ? 'pointer' : 'not-allowed' }}>
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: isCurrent ? 'var(--color-gold)' : 'inherit', marginRight: '4px', minWidth: '18px', fontSize: '0.7rem' }}>{String(m.month).padStart(2,'0')}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{m.title}</span>
                  {isCurrent && !isActive && <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }} />}
                  {!unlocked && <span style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>🔒</span>}
                </div>
              </NavLink>
            );
          })}

          {/* Year 2 */}
          <button
            onClick={() => setExpandedYear(expandedYear === 2 ? null : 2)}
            className="sidebar-item"
            style={{ justifyContent: 'space-between', width: '100%', marginTop: '4px' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <GraduationCap size={14} /> Year II · Mastery
            </span>
            {expandedYear === 2 ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {expandedYear === 2 && year2Months.map(m => {
            const unlocked = isMonthUnlocked(m.month);
            const isCurrent = m.month === currentMonth;
            const isActive = location.pathname.includes(`/classroom/m${m.month}`);
            return (
              <NavLink
                key={m.month}
                to={unlocked ? `/classroom/m${m.month}` : '#'}
                onClick={(e) => { if (!unlocked) { e.preventDefault(); } else { setMobileOpen(false); } }}
                style={{ textDecoration: 'none' }}
              >
                <div className={`sidebar-item sidebar-month-item ${isActive ? 'active' : ''}`} style={{ opacity: unlocked ? 1 : 0.4, cursor: unlocked ? 'pointer' : 'not-allowed' }}>
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: isCurrent ? 'var(--color-gold)' : 'inherit', marginRight: '4px', minWidth: '18px', fontSize: '0.7rem' }}>{String(m.month).padStart(2,'0')}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{m.title}</span>
                  {isCurrent && !isActive && <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }} />}
                  {!unlocked && <span style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>🔒</span>}
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
            The Atelier © 2026<br />Fine Art Academy
          </p>
        </div>
      </nav>
    </>
  );
}

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const therapists = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Clinical Psychologist',
    speciality: 'Anxiety · Depression · Burnout',
    exp: '8 years experience',
    initial: 'P',
    color: '#4a7c59',
    languages: 'Hindi, English',
    bio: 'Dr. Priya uses CBT and mindfulness-based approaches. She has helped 300+ clients navigate anxiety and burnout with warmth and precision.',
    sessions: '300+ sessions',
  },
  {
    name: 'Arjun Mehta',
    role: 'Counselling Psychologist',
    speciality: 'Relationships · Grief · Self-esteem',
    exp: '6 years experience',
    initial: 'A',
    color: '#2d5a3d',
    languages: 'Hindi, English, Punjabi',
    bio: 'Arjun specialises in relationship dynamics and life transitions. Known for his non-judgmental, grounded approach to complex emotions.',
    sessions: '200+ sessions',
  },
  {
    name: 'Dr. Sneha Rao',
    role: 'Psychotherapist',
    speciality: "Trauma · PTSD · Women's Health",
    exp: '10 years experience',
    initial: 'S',
    color: '#6a9e78',
    languages: 'Kannada, Telugu, English',
    bio: 'Dr. Sneha is trauma-informed and trained in EMDR. She creates a deeply safe space for survivors and those navigating identity.',
    sessions: '500+ sessions',
  },
  {
    name: 'Rahul Bose',
    role: 'Behavioural Therapist',
    speciality: 'ADHD · OCD · Stress Management',
    exp: '5 years experience',
    initial: 'R',
    color: '#4a7c59',
    languages: 'Bengali, Hindi, English',
    bio: 'Rahul uses evidence-based behavioural techniques to help clients build practical coping skills they can use every single day.',
    sessions: '150+ sessions',
  },
];

export default function Therapists() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="therapists" style={{ padding: '96px 24px', background: '#f5f0e8' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{ color: '#4a7c59', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Our Team
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,5vw,48px)', color: '#1a1a1a', marginBottom: '16px' }}>
            Meet your therapists
          </h2>
          <p style={{ color: '#6b7280', fontWeight: 300, maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
            Every therapist is verified, certified, and carefully selected for warmth and expertise.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {therapists.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#faf7f2',
                borderRadius: '20px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: hovered === i ? '0 12px 40px rgba(74,124,89,0.15)' : '0 2px 12px rgba(0,0,0,0.04)',
                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.35s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent line on hover */}
              <motion.div
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: t.color,
                  transformOrigin: 'left',
                }}
              />

              {/* Avatar */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: t.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '20px',
              }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: 'white' }}>
                  {t.initial}
                </span>
              </div>

              {/* Name & role */}
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#1a1a1a', marginBottom: '4px' }}>
                {t.name}
              </h3>
              <p style={{ color: '#4a7c59', fontSize: '13px', marginBottom: '12px' }}>{t.role}</p>
              <p style={{ color: '#6b7280', fontSize: '13px', fontWeight: 300, lineHeight: '1.6', marginBottom: '8px' }}>
                {t.speciality}
              </p>
              <p style={{ color: '#d4843a', fontSize: '12px', marginBottom: '16px' }}>{t.exp}</p>

              {/* Bio — revealed on hover */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.7', marginBottom: '12px', paddingTop: '4px' }}>
                      {t.bio}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '11px', background: '#edf5f0', color: '#4a7c59',
                        padding: '4px 10px', borderRadius: '50px',
                      }}>
                        🗣 {t.languages}
                      </span>
                      <span style={{
                        fontSize: '11px', background: '#fef3e8', color: '#d4843a',
                        padding: '4px 10px', borderRadius: '50px',
                      }}>
                        ✓ {t.sessions}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <a
                href="#book"
                style={{
                  marginTop: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  padding: '11px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  textDecoration: 'none',
                  border: `1.5px solid ${t.color}`,
                  color: hovered === i ? 'white' : t.color,
                  background: hovered === i ? t.color : 'transparent',
                  fontWeight: 400,
                  transition: 'all 0.3s',
                }}
              >
                Book a Session
              </a>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <a href="#" style={{
            color: '#4a7c59', fontSize: '14px', textDecoration: 'none',
            fontWeight: 400, borderBottom: '1px solid #4a7c59', paddingBottom: '2px',
          }}>
            View all 50+ therapists →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
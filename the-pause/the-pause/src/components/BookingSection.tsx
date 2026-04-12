'use client'
import { useState } from 'react'

export default function BookingSection() {
  const [sessionType, setSessionType] = useState<'online' | 'offline' | ''>('')

  return (
    <section id="book" style={{padding:'96px 24px', background:'#faf7f2'}}>
      <div style={{maxWidth:'600px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'48px'}}>
          <p style={{color:'#4a7c59', fontSize:'11px', letterSpacing:'0.35em', textTransform:'uppercase', marginBottom:'16px'}}>Get Started</p>
          <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(32px,5vw,48px)', color:'#1a1a1a', marginBottom:'16px'}}>Book your first session</h2>
          <p style={{color:'#6b7280', fontWeight:'300', lineHeight:'1.7'}}>Fill this short form and we will match you with the right therapist within 2 hours.</p>
        </div>

        <div style={{background:'white', borderRadius:'24px', padding:'48px', boxShadow:'0 4px 40px rgba(0,0,0,0.06)'}}>

          {/* Session Type Toggle */}
          <div style={{marginBottom:'28px'}}>
            <label style={{display:'block', fontSize:'13px', color:'#1a1a1a', marginBottom:'12px', fontWeight:'400'}}>How would you like to meet?</label>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              <div
                onClick={() => setSessionType('online')}
                style={{border: sessionType === 'online' ? '2px solid #4a7c59' : '1.5px solid #e5e7eb', borderRadius:'14px', padding:'16px', cursor:'pointer', textAlign:'center', background: sessionType === 'online' ? '#f0f7f2' : 'white', transition:'all 0.2s'}}
              >
                <p style={{fontSize:'24px', marginBottom:'6px'}}>💻</p>
                <p style={{fontFamily:'Playfair Display, serif', fontSize:'15px', color:'#1a1a1a', marginBottom:'4px'}}>Online</p>
                <p style={{fontSize:'12px', color:'#6b7280', fontWeight:'300'}}>Video or chat session</p>
              </div>
              <div
                onClick={() => setSessionType('offline')}
                style={{border: sessionType === 'offline' ? '2px solid #4a7c59' : '1.5px solid #e5e7eb', borderRadius:'14px', padding:'16px', cursor:'pointer', textAlign:'center', background: sessionType === 'offline' ? '#f0f7f2' : 'white', transition:'all 0.2s'}}
              >
                <p style={{fontSize:'24px', marginBottom:'6px'}}>🏥</p>
                <p style={{fontFamily:'Playfair Display, serif', fontSize:'15px', color:'#1a1a1a', marginBottom:'4px'}}>In-Person</p>
                <p style={{fontSize:'12px', color:'#6b7280', fontWeight:'300'}}>Visit our clinic</p>
              </div>
            </div>
          </div>

          {/* Clinic location info if offline */}
          {sessionType === 'offline' && (
            <div style={{background:'#f5f0e8', borderRadius:'12px', padding:'16px', marginBottom:'24px', display:'flex', gap:'12px', alignItems:'flex-start'}}>
              <span style={{fontSize:'18px'}}>📍</span>
              <div>
                <p style={{fontSize:'13px', color:'#1a1a1a', fontWeight:'400', marginBottom:'4px'}}>The Pause Clinic</p>
                <p style={{fontSize:'12px', color:'#6b7280', fontWeight:'300', lineHeight:'1.6'}}>Sector 15, Sonipat, Haryana · Mon–Sat, 9am–7pm</p>
              </div>
            </div>
          )}

          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block', fontSize:'13px', color:'#1a1a1a', marginBottom:'8px', fontWeight:'400'}}>Your name</label>
            <input type="text" placeholder="Akhil Sharma" style={{width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1.5px solid #e5e7eb', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', color:'#1a1a1a', background:'#faf7f2', boxSizing:'border-box'}} />
          </div>

          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block', fontSize:'13px', color:'#1a1a1a', marginBottom:'8px', fontWeight:'400'}}>Email address</label>
            <input type="email" placeholder="you@example.com" style={{width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1.5px solid #e5e7eb', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', color:'#1a1a1a', background:'#faf7f2', boxSizing:'border-box'}} />
          </div>

          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block', fontSize:'13px', color:'#1a1a1a', marginBottom:'8px', fontWeight:'400'}}>Phone number</label>
            <input type="tel" placeholder="+91 98765 43210" style={{width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1.5px solid #e5e7eb', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', color:'#1a1a1a', background:'#faf7f2', boxSizing:'border-box'}} />
          </div>

          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block', fontSize:'13px', color:'#1a1a1a', marginBottom:'8px', fontWeight:'400'}}>What are you dealing with?</label>
            <select style={{width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1.5px solid #e5e7eb', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', color:'#6b7280', background:'#faf7f2', boxSizing:'border-box'}}>
              <option value="">Select a concern</option>
              <option>Anxiety</option>
              <option>Depression</option>
              <option>Burnout</option>
              <option>Relationships</option>
              <option>Grief & Loss</option>
              <option>Trauma & PTSD</option>
              <option>ADHD</option>
              <option>Stress</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{marginBottom:'32px'}}>
            <label style={{display:'block', fontSize:'13px', color:'#1a1a1a', marginBottom:'8px', fontWeight:'400'}}>Anything else? <span style={{color:'#9ca3af'}}>(optional)</span></label>
            <textarea placeholder="Tell us a little about what you are going through..." rows={4} style={{width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1.5px solid #e5e7eb', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', color:'#1a1a1a', background:'#faf7f2', boxSizing:'border-box', resize:'none', lineHeight:'1.6'}} />
          </div>

          <button style={{width:'100%', padding:'16px', background: sessionType ? '#4a7c59' : '#9ca3af', color:'white', border:'none', borderRadius:'50px', fontSize:'15px', fontFamily:'DM Sans, sans-serif', cursor: sessionType ? 'pointer' : 'not-allowed', fontWeight:'400', boxShadow: sessionType ? '0 4px 24px rgba(74,124,89,0.25)' : 'none', transition:'all 0.3s'}}>
            {sessionType === 'online' ? '💻 Book Online Session →' : sessionType === 'offline' ? '🏥 Book In-Person Session →' : 'Select a session type above'}
          </button>

          <p style={{textAlign:'center', color:'#9ca3af', fontSize:'12px', marginTop:'16px', fontWeight:'300'}}>
            We will reach out within 2 hours · 100% confidential
          </p>

        </div>
      </div>
    </section>
  )
}
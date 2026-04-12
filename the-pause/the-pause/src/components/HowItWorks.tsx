export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Tell us what you need', desc: 'Fill a short, private form about what you are going through. No judgment, no pressure.', icon: '💬' },
    { number: '02', title: 'Get matched instantly', desc: 'We match you with a certified psychologist who specialises in exactly what you need.', icon: '🎯' },
    { number: '03', title: 'Begin your sessions', desc: 'Meet online via video or chat — from your home, at your pace, on your schedule.', icon: '🌿' },
  ]
  return (
    <section id="how-it-works" style={{padding:'96px 24px', background:'#faf7f2'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'72px'}}>
          <p style={{color:'#4a7c59', fontSize:'11px', letterSpacing:'0.35em', textTransform:'uppercase', marginBottom:'16px'}}>Simple Process</p>
          <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(32px,5vw,48px)', color:'#1a1a1a', marginBottom:'16px'}}>How The Pause works</h2>
          <p style={{color:'#6b7280', fontWeight:'300', maxWidth:'440px', margin:'0 auto', lineHeight:'1.7'}}>Three simple steps to start your healing journey today.</p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'32px'}}>
          {steps.map((step, i) => (
            <div key={i} style={{background:'#f5f0e8', borderRadius:'24px', padding:'40px 36px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'-16px', right:'24px', fontFamily:'Playfair Display, serif', fontSize:'96px', color:'rgba(74,124,89,0.07)', fontWeight:'700', lineHeight:'1', pointerEvents:'none'}}>{step.number}</div>
              <div style={{fontSize:'36px', marginBottom:'20px'}}>{step.icon}</div>
              <h3 style={{fontFamily:'Playfair Display, serif', fontSize:'22px', color:'#1a1a1a', marginBottom:'12px'}}>{step.title}</h3>
              <p style={{color:'#6b7280', fontWeight:'300', lineHeight:'1.8', fontSize:'15px'}}>{step.desc}</p>
              <div style={{marginTop:'24px', display:'flex', alignItems:'center', gap:'8px'}}>
                <div style={{width:'24px', height:'2px', background:'#4a7c59'}}></div>
                <p style={{color:'#4a7c59', fontSize:'12px', letterSpacing:'0.1em'}}>Step {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
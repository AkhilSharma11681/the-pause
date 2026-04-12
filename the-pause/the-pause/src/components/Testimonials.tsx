export default function Testimonials() {
  const testimonials = [
    { quote: 'I was skeptical about online therapy but The Pause changed everything. My therapist actually listens.', name: 'Ananya, 26', tag: 'Anxiety & Burnout' },
    { quote: 'Finally found a space where I did not have to explain myself from scratch every session.', name: 'Rohan, 31', tag: 'Depression' },
    { quote: 'The pricing is honest, the therapists are real. No corporate feel at all. Just care.', name: 'Meera, 29', tag: 'Relationship Issues' },
  ]
  return (
    <section style={{padding:'96px 24px', background:'#faf7f2'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'64px'}}>
          <p style={{color:'#4a7c59', fontSize:'12px', letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:'16px'}}>Stories</p>
          <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(32px,5vw,48px)', color:'#1a1a1a'}}>People who paused</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px'}}>
          {testimonials.map((t, i) => (
            <div key={i} style={{background:'#f5f0e8', borderRadius:'20px', padding:'40px 32px'}}>
              <p style={{fontFamily:'Playfair Display, serif', fontSize:'48px', color:'#4a7c59', marginBottom:'16px', lineHeight:'1'}}>&quot;</p>
              <p style={{color:'#1a1a1a', fontWeight:'300', lineHeight:'1.8', marginBottom:'24px'}}>{t.quote}</p>
              <p style={{color:'#1a1a1a', fontSize:'14px', fontWeight:'500'}}>{t.name}</p>
              <p style={{color:'#4a7c59', fontSize:'13px', marginTop:'4px'}}>{t.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
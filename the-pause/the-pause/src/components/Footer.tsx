export default function Footer() {
  return (
    <footer style={{background:'#1a1a1a', color:'white', padding:'80px 24px 40px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'48px', marginBottom:'64px'}}>
          <div style={{gridColumn:'span 2'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px'}}>
              <div style={{display:'flex', gap:'5px'}}>
                <div style={{width:'6px', height:'24px', background:'#4a7c59', borderRadius:'3px'}}></div>
                <div style={{width:'6px', height:'24px', background:'#4a7c59', borderRadius:'3px'}}></div>
              </div>
              <span style={{fontFamily:'Playfair Display, serif', fontSize:'20px'}}>The Pause</span>
            </div>
            <p style={{color:'#9ca3af', fontWeight:'300', lineHeight:'1.7', maxWidth:'320px'}}>A calm, private space for psychological care. Licensed therapists, honest pricing, real results.</p>
          </div>
          <div>
            <p style={{fontSize:'12px', color:'#6b7280', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'20px'}}>Services</p>
            {['Individual Therapy', 'Couples Therapy', 'Teen Counselling', 'Psychiatric Care'].map((s, i) => (
              <p key={i} style={{color:'#9ca3af', fontWeight:'300', fontSize:'14px', marginBottom:'10px'}}>{s}</p>
            ))}
          </div>
          <div>
            <p style={{fontSize:'12px', color:'#6b7280', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'20px'}}>Company</p>
            {['About Us', 'Our Therapists', 'Privacy Policy', 'Contact'].map((s, i) => (
              <p key={i} style={{color:'#9ca3af', fontWeight:'300', fontSize:'14px', marginBottom:'10px'}}>{s}</p>
            ))}
          </div>
        </div>
        <div style={{borderTop:'1px solid #2d2d2d', paddingTop:'32px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'16px'}}>
          <p style={{color:'#6b7280', fontSize:'13px', fontWeight:'300'}}>© 2025 The Pause. All rights reserved.</p>
          <p style={{color:'#6b7280', fontSize:'13px', fontWeight:'300'}}>Crisis helpline: <span style={{color:'#4a7c59'}}>iCall 9152987821</span></p>
        </div>
      </div>
    </footer>
  )
}
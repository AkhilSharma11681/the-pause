export default function CTA() {
  return (
    <section style={{padding:'96px 24px', background:'#2d5a3d', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', top:'-50%', right:'-10%', width:'600px', height:'600px', background:'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none'}}></div>
      <div style={{maxWidth:'700px', margin:'0 auto', textAlign:'center', position:'relative', zIndex:1}}>
        <div style={{display:'flex', justifyContent:'center', gap:'8px', marginBottom:'32px'}}>
          <div style={{width:'10px', height:'40px', background:'rgba(255,255,255,0.4)', borderRadius:'5px'}}></div>
          <div style={{width:'10px', height:'40px', background:'rgba(255,255,255,0.4)', borderRadius:'5px'}}></div>
        </div>
        <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(32px,5vw,52px)', color:'white', lineHeight:'1.2', marginBottom:'20px', fontWeight:'600'}}>
          Ready to take your pause?
        </h2>
        <p style={{color:'rgba(255,255,255,0.65)', fontSize:'17px', fontWeight:'300', lineHeight:'1.8', marginBottom:'40px', maxWidth:'480px', margin:'0 auto 40px'}}>
          Your first step is just a click away. No long forms, no waiting — just care.
        </p>
        <a href="#book" style={{display:'inline-block', background:'white', color:'#2d5a3d', padding:'16px 40px', borderRadius:'50px', fontSize:'15px', textDecoration:'none', fontWeight:'500', boxShadow:'0 8px 32px rgba(0,0,0,0.15)', transition:'all 0.3s'}}>
          Book a Session Today
        </a>
        <p style={{color:'rgba(255,255,255,0.4)', fontSize:'13px', marginTop:'20px', fontWeight:'300'}}>
          From ₹499 · Cancel anytime · Certified therapists
        </p>
      </div>
    </section>
  )
}
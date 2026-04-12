export default function TrustBadges() {
  const badges = [
    { icon: '🔒', title: '100% Confidential', desc: 'Your privacy is sacred. We never share your data.' },
    { icon: '✅', title: 'Certified Therapists', desc: 'Every therapist is RCI licensed and verified.' },
    { icon: '📱', title: 'Online & Flexible', desc: 'Session from anywhere, any time that suits you.' },
    { icon: '⚡', title: 'Quick Matching', desc: 'Matched with the right therapist within 2 hours.' },
  ]
  return (
    <section style={{padding:'72px 24px', background:'white', borderTop:'1px solid #f0ebe3', borderBottom:'1px solid #f0ebe3'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'40px'}}>
        {badges.map((b, i) => (
          <div key={i} style={{display:'flex', alignItems:'flex-start', gap:'16px'}}>
            <div style={{width:'48px', height:'48px', borderRadius:'14px', background:'#f5f0e8', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0}}>
              {b.icon}
            </div>
            <div>
              <p style={{fontFamily:'Playfair Display, serif', fontSize:'16px', color:'#1a1a1a', marginBottom:'6px'}}>{b.title}</p>
              <p style={{color:'#6b7280', fontSize:'13px', fontWeight:'300', lineHeight:'1.6'}}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
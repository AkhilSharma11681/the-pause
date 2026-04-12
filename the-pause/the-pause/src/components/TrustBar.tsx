export default function TrustBar() {
  const stats = [
    { number: '2,400+', label: 'Sessions Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '<2hrs', label: 'Average Response Time' },
    { number: '50+', label: 'Certified Psychologists' },
  ]
  return (
    <section style={{background:'#2d5a3d', padding:'48px 24px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'32px', textAlign:'center'}}>
        {stats.map((stat, i) => (
          <div key={i}>
            <p style={{fontFamily:'Playfair Display, serif', fontSize:'40px', color:'white', marginBottom:'8px'}}>{stat.number}</p>
            <p style={{color:'#6a9e78', fontSize:'14px', fontWeight:'300', letterSpacing:'0.05em'}}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
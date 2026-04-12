export default function Pricing() {
  const plans = [
    { name: 'Single Session', price: '₹499', period: 'per session', desc: 'Perfect to start. No commitment.', features: ['1 video session (50 min)', 'Certified psychologist', 'Private & confidential', 'Session notes shared'], cta: 'Book Now', highlight: false },
    { name: 'Monthly Care', price: '₹1,599', period: 'per month', desc: 'Most popular. Real progress.', features: ['4 sessions per month', 'Same therapist every time', 'WhatsApp check-ins', 'Progress tracking', 'Priority booking'], cta: 'Start Monthly', highlight: true },
    { name: 'Intensive', price: '₹2,799', period: 'per month', desc: 'For deeper, faster healing.', features: ['8 sessions per month', 'Dedicated therapist', 'Daily check-ins', 'Personalised care plan', 'Family session included'], cta: 'Get Started', highlight: false },
  ]
  return (
    <section id="pricing" style={{padding:'96px 24px', background:'#f5f0e8'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'64px'}}>
          <p style={{color:'#4a7c59', fontSize:'12px', letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:'16px'}}>Transparent Pricing</p>
          <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(32px,5vw,48px)', color:'#1a1a1a', marginBottom:'12px'}}>Simple, honest pricing</h2>
          <p style={{color:'#6b7280', fontWeight:'300'}}>No hidden fees. Cancel anytime.</p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px', alignItems:'center'}}>
          {plans.map((plan, i) => (
            <div key={i} style={{borderRadius:'20px', padding:'40px 32px', background: plan.highlight ? '#4a7c59' : '#faf7f2', transform: plan.highlight ? 'scale(1.05)' : 'scale(1)', boxShadow: plan.highlight ? '0 20px 60px rgba(74,124,89,0.3)' : 'none'}}>
              <p style={{fontSize:'13px', fontWeight:'300', marginBottom:'4px', color: plan.highlight ? '#a8d5b5' : '#4a7c59'}}>{plan.name}</p>
              <p style={{fontFamily:'Playfair Display, serif', fontSize:'42px', color: plan.highlight ? 'white' : '#1a1a1a', marginBottom:'4px'}}>{plan.price}</p>
              <p style={{fontSize:'13px', marginBottom:'8px', color: plan.highlight ? '#a8d5b5' : '#6b7280'}}>{plan.period}</p>
              <p style={{fontSize:'14px', marginBottom:'24px', fontWeight:'300', color: plan.highlight ? '#d4f0dc' : '#6b7280'}}>{plan.desc}</p>
              <ul style={{listStyle:'none', marginBottom:'32px'}}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{fontSize:'14px', fontWeight:'300', padding:'6px 0', color: plan.highlight ? 'white' : '#6b7280', display:'flex', gap:'8px'}}>
                    <span style={{color: plan.highlight ? '#a8d5b5' : '#4a7c59'}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#book" style={{display:'block', textAlign:'center', padding:'14px', borderRadius:'50px', fontSize:'14px', textDecoration:'none', background: plan.highlight ? 'white' : '#4a7c59', color: plan.highlight ? '#4a7c59' : 'white', transition:'all 0.3s'}}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
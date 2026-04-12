import { Wind, CloudRain, Flame, Heart, Leaf, Shield, Zap, RefreshCw, Sparkles, Flower2, Moon, Brain } from 'lucide-react'

export default function Conditions() {
  const conditions = [
    { name: 'Anxiety', icon: Wind, color: '#e8f4ec', iconColor: '#4a7c59', desc: 'Worry & panic' },
    { name: 'Depression', icon: CloudRain, color: '#e8f0f4', iconColor: '#4a6d8c', desc: 'Low mood & sadness' },
    { name: 'Burnout', icon: Flame, color: '#f4ede8', iconColor: '#c46d3a', desc: 'Exhaustion & stress' },
    { name: 'Relationships', icon: Heart, color: '#f4e8f0', iconColor: '#b85c8a', desc: 'Couples & family' },
    { name: 'Grief & Loss', icon: Leaf, color: '#f4f0e8', iconColor: '#8a7a4a', desc: 'Healing & acceptance' },
    { name: 'Trauma & PTSD', icon: Shield, color: '#e8f4ec', iconColor: '#2d5a3d', desc: 'Past wounds' },
    { name: 'ADHD', icon: Zap, color: '#f4f4e8', iconColor: '#8a8a2a', desc: 'Focus & attention' },
    { name: 'OCD', icon: RefreshCw, color: '#e8ecf4', iconColor: '#4a5a8c', desc: 'Thoughts & habits' },
    { name: 'Self-esteem', icon: Sparkles, color: '#e8f4ec', iconColor: '#4a7c59', desc: 'Confidence & worth' },
    { name: "Women's Health", icon: Flower2, color: '#f4e8f0', iconColor: '#b85c8a', desc: 'Hormones & identity' },
    { name: 'Sleep Issues', icon: Moon, color: '#eee8f4', iconColor: '#6a4a8c', desc: 'Rest & recovery' },
    { name: 'Stress', icon: Brain, color: '#e8f4f0', iconColor: '#3a8a7a', desc: 'Calm & balance' },
  ]

  return (
    <section style={{padding:'96px 24px', background:'#faf7f2'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'64px'}}>
          <p style={{color:'#4a7c59', fontSize:'11px', letterSpacing:'0.35em', textTransform:'uppercase', marginBottom:'16px'}}>We Can Help With</p>
          <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(32px,5vw,48px)', color:'#1a1a1a', marginBottom:'16px'}}>What are you going through?</h2>
          <p style={{color:'#6b7280', fontWeight:'300', maxWidth:'440px', margin:'0 auto'}}>Whatever it is, you don't have to face it alone.</p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
          {conditions.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={i} style={{background:c.color, borderRadius:'20px', padding:'28px 24px', cursor:'pointer', transition:'all 0.3s', display:'flex', flexDirection:'column', gap:'14px'}}>
                <div style={{width:'44px', height:'44px', borderRadius:'12px', background:'white', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                  <Icon size={20} color={c.iconColor} strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{color:'#1a1a1a', fontSize:'14px', fontWeight:'500', marginBottom:'4px', fontFamily:'Playfair Display, serif'}}>{c.name}</p>
                  <p style={{color:'#6b7280', fontSize:'12px', fontWeight:'300'}}>{c.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
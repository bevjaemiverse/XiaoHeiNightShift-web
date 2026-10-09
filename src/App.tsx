import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowCounterClockwise, ArrowDown, ArrowRight, Check, Moon, Scan, Wrench } from '@phosphor-icons/react'
import ClickSpark from './components/ClickSpark/ClickSpark'

type Gate = 'X' | 'H' | 'Z' | 'Ry'

const gateDescriptions: Record<Gate, string> = {
  X: '把 |0〉翻到 |1〉',
  H: '把确定答案分成两条路',
  Z: '改变相位，概率暂时不动',
  Ry: '连续旋转量子状态',
}

function MiniGame() {
  const [slot, setSlot] = useState<Gate | null>(null)
  const [selected, setSelected] = useState<Gate | null>(null)
  const [result, setResult] = useState<'idle' | 'testing' | 'success' | 'retry'>('idle')
  const reduceMotion = useReducedMotion()
  const probability = slot === 'X' ? 100 : slot === 'H' || slot === 'Ry' ? 50 : 0

  const status = useMemo(() => {
    if (result === 'testing') return '量子球正在通过线路'
    if (result === 'success') return '工单完成，P(1) 达到 100%'
    if (result === 'retry') return `当前 P(1) 为 ${probability}%，再换一张门牌`
    if (slot) return `${slot} 门已安装，可以开始测试`
    return '点击门牌，再点击插槽。也可以直接拖进去。'
  }, [probability, result, slot])

  const place = (gate: Gate) => {
    setSlot(gate)
    setSelected(null)
    setResult('idle')
  }

  const test = () => {
    if (!slot || result === 'testing') return
    setResult('testing')
    window.setTimeout(() => setResult(probability === 100 ? 'success' : 'retry'), reduceMotion ? 80 : 900)
  }

  return (
    <div className="demo-shell">
      <div className="demo-ticket">
        <span>第 1 夜　工单 1/5</span>
        <h3>翻面灯</h3>
        <p>把这张操作牌放进线路。</p>
      </div>
      <div className="demo-target">
        <strong>目标 P(1)：99-100%</strong>
        <span>稳定 3/3</span>
      </div>
      <div className="demo-window">
        <div className="leviathan-eye" aria-hidden="true"><i /></div>
        <span className="measurement">测量出口</span>
        <div className="circuit-line" />
        <button
          className={`circuit-slot ${slot ? 'filled' : ''}`}
          onClick={() => selected && place(selected)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => place(event.dataTransfer.getData('text/plain') as Gate)}
          aria-label={slot ? `已安装 ${slot} 门` : '空线路插槽'}
        >
          {slot || '放门牌'}
        </button>
        <motion.div
          className={`quantum-orb ${result}`}
          animate={result === 'testing' && !reduceMotion ? { y: [0, -185], scale: [1, .84] } : { y: 0, scale: 1 }}
          transition={{ duration: .85, ease: [.16, 1, .3, 1] }}
        >
          <i /><b>P(1) {result === 'success' || result === 'retry' ? probability : 0}%</b>
        </motion.div>
        <div className="mini-xiaohei" aria-label="小黑正在值班"><i /><i /></div>
      </div>
      <p className={`demo-status ${result}`} aria-live="polite">
        {result === 'success' && <Check weight="bold" />} {status}
      </p>
      <div className="gate-tray" aria-label="维修工具">
        {(Object.keys(gateDescriptions) as Gate[]).map((gate) => (
          <button
            key={gate}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('text/plain', gate)}
            onClick={() => { setSelected(gate); setResult('idle') }}
            className={selected === gate ? 'selected' : ''}
            aria-pressed={selected === gate}
          >
            <strong>{gate}</strong><small>{gateDescriptions[gate]}</small>
          </button>
        ))}
      </div>
      <div className="demo-actions">
        <button className="reset-button" onClick={() => { setSlot(null); setSelected(null); setResult('idle') }}>
          <ArrowCounterClockwise /> 重置
        </button>
        <button className="test-button" disabled={!slot || result === 'testing'} onClick={test}>
          {result === 'testing' ? '测试中' : '开始测试'} <ArrowRight weight="bold" />
        </button>
      </div>
    </div>
  )
}

const chapters = [
  { image: '/assets/day-shift-photo.png', title: '白班很体面', copy: '夜班留下来的，通常不是体面问题。' },
  { image: '/assets/xiaohei-home.png', title: '下班也要生活', copy: '领工资、布置宿舍，把星港慢慢住成家。' },
  { image: '/assets/starport-mall-v2.png', title: '周末去星港', copy: '商店、市场和一大堆值得花掉的夜航点。' },
]

function App() {
  const reduceMotion = useReducedMotion()

  return (
    <ClickSpark sparkColor="#d95f1f" sparkSize={7} sparkRadius={18} sparkCount={reduceMotion ? 0 : 6} duration={360}>
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-creature"><i /><i /></span>
          <span>小黑天天上夜班</span>
        </a>
        <nav aria-label="主导航">
          <a href="#try">先试一班</a>
          <a href="#life">星港生活</a>
          <a className="nav-cta" href="#play">扫码游玩</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
          >
            <span className="eyebrow">量子线路维修部正在招夜班</span>
            <h1>今晚，轮到小黑<br />修宇宙了。</h1>
            <p>装好门牌，让量子球抵达正确出口。别让利维坦看出你是第一天上班。</p>
            <div className="hero-actions">
              <a className="primary-cta" href="#try">先试一班 <ArrowDown weight="bold" /></a>
              <a className="text-link" href="#play">直接扫码 <Scan weight="bold" /></a>
            </div>
          </motion.div>
          <motion.img
            className="hero-art"
            src="/assets/hero-night-repair.png"
            alt="小黑在星舰窗边安装 X 量子门，窗外的利维坦正在观察"
            initial={reduceMotion ? false : { opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .9, delay: .1, ease: [.16, 1, .3, 1] }}
          />
        </section>

        <section className="intro-band" aria-label="游戏简介">
          <strong>25 张手工工单</strong>
          <span>没有倒计时，可以慢慢修</span>
          <span>X、H、Z、Ry 都在工具箱里</span>
        </section>

        <section className="try-section" id="try">
          <div className="section-copy">
            <span className="section-mark"><Wrench weight="fill" /> 值班培训</span>
            <h2>先把第一颗量子球送到出口。</h2>
            <p>目标是 P(1) 100%。试着把 X 门放进线路，然后按下测试。</p>
            <aside className="plain-note">不用懂量子力学。工单会把任务写清楚，小黑只负责动手。</aside>
          </div>
          <MiniGame />
        </section>

        <section className="life-section" id="life">
          <div className="life-heading">
            <Moon weight="fill" />
            <h2>夜班之外，也是一整段生活。</h2>
            <p>交班、领工资、晋升、逛星港。维修线路只是小黑生活的开始。</p>
          </div>
          <div className="chapter-grid">
            {chapters.map((chapter, index) => (
              <motion.article
                key={chapter.title}
                className={`chapter chapter-${index + 1}`}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .25 }}
                transition={{ duration: .6, delay: index * .08 }}
              >
                <img src={chapter.image} alt={chapter.title} loading="lazy" />
                <div><h3>{chapter.title}</h3><p>{chapter.copy}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="play-section" id="play">
          <div className="scan-copy">
            <span className="section-mark">准备交班</span>
            <h2>真正的夜班，在微信里等你。</h2>
            <p>用微信扫描小游戏码。主线进度、星港资产和好友挑战都留在小游戏内。</p>
          </div>
          <div className="qr-placeholder" role="img" aria-label="小游戏码尚待提供">
            <img
              src="/wechat-mini-game-code.png"
              alt="微信小游戏《小黑天天上夜班》小游戏码"
              onLoad={(event) => event.currentTarget.parentElement?.classList.add('has-code')}
              onError={(event) => { event.currentTarget.style.display = 'none' }}
            />
            <Scan size={62} weight="thin" />
            <strong>小游戏码待放入</strong>
            <span>将官方码保存为<br /><code>public/wechat-mini-game-code.png</code></span>
          </div>
        </section>
      </main>

      <footer>
        <span className="footer-creature" aria-hidden="true"><i /><i /></span>
        <p>《小黑天天上夜班》<br />一款竖屏量子线路解谜微信小游戏</p>
        <a href="#top">回到值班室 <ArrowDown className="up-arrow" /></a>
      </footer>
    </div>
    </ClickSpark>
  )
}

export default App

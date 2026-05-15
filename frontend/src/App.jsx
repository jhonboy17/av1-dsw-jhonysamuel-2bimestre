import heroImg from './assets/hero.png'
import './App.css'

const navLinks = [
  { href: '#home', label: 'Início' },
  { href: '#appointment', label: 'Agendamento' },
  { href: '#contact', label: 'Contato' },
]

function App() {
  return (
    <div className="hp" id="home">
      <header className="hpHeader">
        <nav className="hpNav" aria-label="Navegação principal">
          <a className="hpBrand" href="#home" aria-label="Início">
            <span className="hpBrandIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M12 3a1 1 0 0 1 1 1v2.1a7 7 0 1 1-2 0V4a1 1 0 0 1 1-1Zm-1 7a1 1 0 0 0-1 1v1H9a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2h-1v-1a1 1 0 0 0-1-1Z"
                />
              </svg>
            </span>
          </a>

          <ul className="hpNavLinks">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a className="hpNavLink" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hpAuth">
            <a className="hpAuthLink" href="#signup">
              Cadastrar
            </a>
            <a className="hpAuthButton" href="#login">
              Entrar
            </a>
          </div>
        </nav>
      </header>

      <main className="hpMain">
        <section className="hpHero" aria-label="Apresentação">
          <div className="hpHeroText">
            <p className="hpKicker">BEM-VINDO</p>
            <h1 className="hpTitle">
              Clínica Médica em que <span className="hpAccent">você pode confiar.</span>
            </h1>
            <p className="hpLead">
              Atendimento humanizado com agendamento simples.
            </p>

            <div className="hpCtas">
              <a className="hpPrimary" href="#appointment">
                Agendar
              </a>
              <a className="hpSecondary" href="#about">
                Saiba mais
              </a>
            </div>
          </div>

          <div className="hpHeroMedia" aria-hidden="true">
            <div className="hpImageCard">
              <img
                src={heroImg}
                className="hpHeroImg"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="hpBand" aria-label="Agendamento">
          <form className="hpForm" id="appointment">
            <div className="hpField">
              <label className="hpLabel" htmlFor="firstName">
                Nome
              </label>
              <input className="hpInput" id="firstName" name="firstName" placeholder="Seu nome" />
            </div>

            <div className="hpField">
              <label className="hpLabel" htmlFor="lastName">
                Sobrenome
              </label>
              <input className="hpInput" id="lastName" name="lastName" placeholder="Seu sobrenome" />
            </div>

            <div className="hpField">
              <label className="hpLabel" htmlFor="email">
                E-mail
              </label>
              <input className="hpInput" id="email" name="email" type="email" placeholder="Seu e-mail" />
            </div>

            <div className="hpField">
              <label className="hpLabel" htmlFor="contact">
                Telefone
              </label>
              <input className="hpInput" id="contact" name="contact" placeholder="Seu telefone" />
            </div>

            <button className="hpSubmit" type="button">
              Agendar
            </button>
          </form>
        </section>

        <section className="hpSpacer" id="about" aria-label="Spacer" />
      </main>
    </div>
  )
}

export default App

import { useRef, useState } from 'react';
import Button from '../ui/Button';
import './Join.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDLE = { type: '', text: 'Demo form: nothing is sent.' };

/**
 * Early-access form. Demo only: it validates the email and sends nothing.
 * To make it real, post `{ email, role }` to your form service or API in `onSubmit`.
 */
export default function Join() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Individual');
  const [msg, setMsg] = useState(IDLE);
  const emailRef = useRef(null);
  const invalid = msg.type === 'err';

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = EMAIL_RE.test(email.trim());
    if (ok) {
      setMsg({ type: 'ok', text: `✓ You're on the list as ${role === 'Company' ? 'a company' : 'an individual'}. (Demo: nothing was sent.)` });
    } else {
      setMsg({ type: 'err', text: 'Enter an email like name@example.com.' });
      emailRef.current?.focus();
    }
  };

  const onEmail = (e) => {
    setEmail(e.target.value);
    if (invalid) setMsg(IDLE);
  };

  return (
    <section className="join wrap" id="join" aria-labelledby="joinH">
      <span className="chip"><span className="dot" />Early access</span>
      <h2 className="h2" id="joinH">Your future in care <span className="t">starts here.</span></h2>
      <p className="lede">Join the early access list and be first to build your CareConnect profile.</p>
      <form className="form" id="form" noValidate onSubmit={onSubmit}>
        <div className={`float${invalid ? ' err' : ''}`}>
          <input ref={emailRef} type="email" id="email" placeholder=" " autoComplete="email" required
            aria-describedby="formMsg" aria-invalid={invalid} value={email} onChange={onEmail} />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="float">
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Individual</option>
            <option>Company</option>
          </select>
          <label htmlFor="role">I'm joining as</label>
        </div>
        <Button type="submit" label="Join the list" magnetic />
        <p className={`form-msg${msg.type ? ` ${msg.type}` : ''}`} id="formMsg" role="status">{msg.text}</p>
      </form>
    </section>
  );
}

/** Phone frame showing one of the app screens: 'choose' | 'certs' | 'feed'. Pass children to replace the screen. */
export default function Phone({ screen, rotate, children }) {
  return (
    <div className="phone" style={rotate ? { rotate } : undefined}>
      {children ?? <div className={`scr scr-${screen}`} />}
    </div>
  );
}

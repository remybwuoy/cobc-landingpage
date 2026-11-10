/** Fixed film grain and the progressive blur under the nav. Styled in base.css and Nav.css. */
export default function Ambient() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="edge-blur" aria-hidden="true"><i /><i /><i /><i /></div>
    </>
  );
}

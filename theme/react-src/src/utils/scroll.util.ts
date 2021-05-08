const scrollComponent = document.querySelector('#root') as HTMLElement;

export function jumpTop() {
  scrollComponent.scrollTo(0, 0);
}

export function graceTop() {
  scrollComponent.scrollTo({ top: 0, behavior: 'smooth' });
}

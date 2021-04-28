export function setTitle(title: string, appTitle: string) {
  document.title = title ? `${title}-${appTitle}` : appTitle
}

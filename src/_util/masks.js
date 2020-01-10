export function maskDocument(document) {
  return document.length <= 14
    ? document
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1")
    : document
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskDate(date) {
  return date
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
}

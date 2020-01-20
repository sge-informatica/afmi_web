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

export function maskCPFOnly(document) {
  return document
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function unMaskCpf(document) {
  return document
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{1,2})/, "$1$2")
    .replace(/(\d{3})(\d{1,2})/, "$1$2")
    .replace(/(\d{4})(\d{1,2})/, "$1$2");
}

export function maskResponseValue(value) {
  if (value.length === 4)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{1})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length === 5)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{2})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length === 6)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length === 7)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{1})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length === 8)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length === 9)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskValue(value) {
  if (value.length <= 6)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{1})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length === 7)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{2})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  else if (value.length > 7 && value.length <= 8) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  } else if (value.length === 9 && value.length <= 10) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{1})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(\d{2})\d+?$/, "$1");
  } else if (value.length === 11 || value.lengt === 12) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(\d{2})\d+?$/, "$1");
  } else {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1R$$$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1,$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{2})\d+?$/, "$1");
  }
}

export function unMaskValue(value) {
  if (value.length === 3) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2.00")
      .replace(/(\d{1})(\d)/, "$1$2")
      .replace(/(-\d{2})\d+?$/, "$1"));
  } else if (value.length === 5) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{1})(\d)/, "$1.$20")
      .replace(/(-\d{2})\d+?$/, "$1"));
  } else if (value.length === 6) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{1})(\d)/, "$1.$2")
      .replace(/(-\d{2})\d+?$/, "$1"));
  } else if (value.length === 7) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(-\d{2})\d+?$/, "$1"));
  } else if (value.length === 8) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(-\d{2})\d+?$/, "$1"));
  } else if (value.length === 9 || value.length === 10) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{1})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{2})\d+?$/, "$1"));
  } else if (value.length === 11) {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{2})\d+?$/, "$1"));
  } else {
    return (value = value
      .replace(/\D/g, "")
      .replace(/(\d{0})(\d)/, "$1$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{2})\d+?$/, "$1"));
  }
}

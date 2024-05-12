class Documents {
  dui(str) {
    const regex = /(^\d{9}$)/;
    const dui = str.match(regex);
    if (dui !== null) {
      const digitos = dui[0]
        .substring(0, 8)
        .split('')
        ?.map((x) => parseInt(x));
      const verificador = parseInt(dui[0].substring(8, 9));
      const suma = digitos.reduce((sum, value, i) => sum + (9 - i) * value);
      return verificador === (10 - (suma % 10)) % 10;
    } else {
      return false;
    }
  }
}

export default new Documents();

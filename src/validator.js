const validator = {
  isValid(crediCardNumber) {
    const cardArreglo = crediCardNumber.split("");
    // console.log(cardArreglo);
    const arregloNumber = cardArreglo
      .filter((value) => value !== " ")
      .map((value) => parseInt(value))
      .reverse();
    //  console.log(arregloNumber)
    let suma = arregloNumber[0];
    for (let i = 1; i < arregloNumber.length; i++) {
      if (i === 1 || i % 2 === 1) {
        arregloNumber[i] = arregloNumber[i] * 2;
        if (arregloNumber[i] / 10 >= 1) {
          arregloNumber[i] = (arregloNumber[i] % 10) + 1;
        }
      }
      suma = suma + arregloNumber[i];
    }

    if (suma % 10 === 0) {
      return true;
    } else {
      return false;
    }
  },
  maskify(crediCardNumber) {
    const cardArreglo = crediCardNumber.split("");
    const arregloNumber = cardArreglo.filter((value) => value !== " ");

    let clave = "";
    if (arregloNumber.length < 5) {
      clave = arregloNumber.join("");
    } else {
      const union1 = arregloNumber
        .slice(arregloNumber.length - 4, arregloNumber.length)
        .join("");
      const union2 = arregloNumber
        .slice(0, arregloNumber.length - 4)
        .join("")
        .replace(/[A-Za-z\d]/g, "#");
      clave = union2 + union1;
    }
    // console.log(clave);
    return clave;
  },
};

export default validator;

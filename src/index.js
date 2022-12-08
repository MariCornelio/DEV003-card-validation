import validator from "./validator.js";

const $formulario = document.querySelector(".formulario-tarjeta");
const $numeroTarjeta = document.querySelector(".numero-tarjeta");
const $cliente = document.querySelector(".nombre");
const $inputs = document.querySelectorAll("input");

const $boton = document.querySelector(".form-button");
const $panel = document.querySelector(".panel");
const $panelWindow = document.querySelector(".panelWindow");

// *********implementando el metodo maskify y poniendo espacios en blanco de manera dinamica*******************

document.addEventListener("input", (e) => {
  if (e.target.matches("#input-tarjeta")) {
    const crediCardNumber = e.target.value;
    $formulario.querySelector("#input-tarjeta").value = crediCardNumber
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();

    const clave = validator.maskify(crediCardNumber);
    $numeroTarjeta.textContent = clave.replace(/([0-9#]{4})/g, "$1 ");

    if (crediCardNumber === "") {
      $numeroTarjeta.textContent = "0000 0000 0000 0000";
    }
  }

  if (e.target.matches("#input-cliente")) {
    const nombreCliente = e.target.value;
    $cliente.textContent = nombreCliente;

    if (nombreCliente === "") {
      $cliente.textContent = "---- ---- ----";
    }
  }
});

// **********validaciones de input*************

$inputs.forEach((input) => {
  const $span = document.createElement("span");
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("formulario-error", "none");
  input.insertAdjacentElement("afterend", $span);
});

document.addEventListener("keyup", (e) => {
  if (e.target.matches("input")) {
    const $input = e.target,
      patron = $input.pattern;
    const regex = new RegExp(patron);
    if (!regex.exec($input.value) && $input.value !== "") {
      document.getElementById($input.name).classList.add("is-active");
    } else {
      document.getElementById($input.name).classList.remove("is-active");
    }

    // ******Habilitar boton***************
    const arrayValidaciones = [];
    let contadorValidaciones = 0;

    for (let i = 0; i < $inputs.length; i++) {
      // aqui volvemos a crear un nuevo regex para cada input porque si jugamos con el anterior solo sera un regex para las dos validaciones y queremos para cada uno ya que son distintas validaciones
      const regex = new RegExp($inputs[i].pattern);
      arrayValidaciones[i] = regex.test($inputs[i].value);
      if (arrayValidaciones[i] === true) {
        contadorValidaciones++;
      }
    }
    if (contadorValidaciones === $inputs.length) {
      $boton.disabled = false;
    } else {
      // se pone esto para que se vuelva a cambiar a disabled
      $boton.disabled = true;
    }
  }
});

// *****abrir ventana modal al clickear validar y hacer funcionar  el método isValid****
document.addEventListener("click", (e) => {
  const crediCardNumber = document.getElementById("input-tarjeta").value;

  if (e.target.matches(".form-button")) {
    $panel.classList.add("is-active");
    e.preventDefault();
    const $icon = document.createElement("i");
    const $pvalid = document.createElement("p");
    const $pinfo = document.createElement("p");
    const $button = document.createElement("button");
    $button.textContent = "Aceptar";
    setTimeout(() => {
      $panel.removeChild($panel.firstElementChild);
      if (validator.isValid(crediCardNumber)) {
        $icon.classList.add("fa-solid", "fa-square-check");
        $panelWindow.insertAdjacentElement("beforeend", $icon);
        $pvalid.innerHTML = `Tu Tarjeta es VÁLIDA <hr> `;
        $panelWindow.insertAdjacentElement("beforeend", $pvalid);
        $pinfo.textContent = `Tu saldo es: $ ${Math.round(
          Math.random() * 1000
        )}`;
        $panelWindow.insertAdjacentElement("beforeend", $pinfo);
        $panelWindow.insertAdjacentElement("beforeend", $button);
      } else {
        $icon.classList.add("fa-solid", "fa-square-xmark");
        $panelWindow.insertAdjacentElement("beforeend", $icon);
        $pvalid.innerHTML = `Tu Tarjeta es INVÁLIDA <hr> `;
        $panelWindow.insertAdjacentElement("beforeend", $pvalid);
        $pinfo.textContent =
          "Vuelve a ingresar o realiza la compra con otro medio de pago";
        $panelWindow.insertAdjacentElement("beforeend", $pinfo);
        $panelWindow.insertAdjacentElement("beforeend", $button);
      }
    }, 5000);
  }

  if (e.target.matches(".panelWindow button")) {
    if (validator.isValid(crediCardNumber)) {
      location.reload();
    } else {
      location.reload();
    }
  }
});

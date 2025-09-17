// La URL de Sheet Monkey para conectar con tu hoja de cálculo
const URL_DEL_SCRIPT = "https://script.google.com/macros/s/AKfycbyaeYOs9xAVjFSObEiYfOp1DlEkZqTffmxNMkT4iuTYWTggIKNtddrnaUZ5gXFLtX29jA/exec";
// --- FUNCIONES PARA ENVIAR DATOS A GOOGLE SHEETS ---

// Función para enviar datos a la pestaña "Ventas"
async function registrarVenta(datosVenta) {
    const response = await fetch(SHEET_MONKEY_URL + "?append=true", {
        method: "POST",
        body: JSON.stringify(datosVenta),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.ok;
}

// Función para enviar datos a la pestaña "Inventario"
async function registrarInventario(datosInventario) {
    const response = await fetch(SHEET_MONKEY_URL + "?append=true", {
        method: "POST",
        body: JSON.stringify(datosInventario),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.ok;
}

// Función para enviar datos a la pestaña "Gastos"
async function registrarGasto(datosGasto) {
    const response = await fetch(SHEET_MONKEY_URL + "?append=true", {
        method: "POST",
        body: JSON.stringify(datosGasto),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.ok;
}

// --- Lógica del formulario de ventas ---
const ventasForm = document.getElementById('ventas-form');

ventasForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

   const ventaData = {
        formName: "Ventas",
        fecha: document.getElementById('venta-fecha').value,
        cliente: document.getElementById('venta-cliente').value,
        producto: document.getElementById('venta-producto').value,
        cantidad: parseInt(document.getElementById('venta-cantidad').value),
        precio: parseInt(document.getElementById('venta-precio').value),
        metodoPago: document.getElementById('venta-metodo').value,
        // Agregamos este campo para el ID de venta
        idVenta: new Date().getTime(),
        // Agregamos este parámetro para que la venta se guarde al final
    };

    // Envía los datos a Google Sheets
    const success = await registrarVenta(ventaData);

    if (success) {
        alert("¡Venta registrada con éxito!");
        ventasForm.reset(); // Limpia el formulario
    } else {
        alert("Ocurrió un error al registrar la venta. Por favor, inténtalo de nuevo.");
    }
});

// --- Lógica del formulario de gastos ---
const gastosForm = document.getElementById('gastos-form');

gastosForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const gastoData = {
        formName: "Gastos",
        fecha: document.getElementById('gasto-fecha').value,
        descripcion: document.getElementById('gasto-descripcion').value,
        monto: parseInt(document.getElementById('gasto-monto').value),
    };

    const success = await registrarGasto(gastoData);

    if (success) {
        alert("¡Gasto registrado con éxito!");
        gastosForm.reset();
    } else {
        alert("Ocurrió un error al registrar el gasto. Por favor, inténtalo de nuevo.");
    }
});
// --- Lógica del formulario de inventario ---
const inventarioForm = document.getElementById('inventario-form');

inventarioForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inventarioData = {
        formName: "Inventario",
        nombre: document.getElementById('inventario-nombre').value,
        tipo: document.getElementById('inventario-tipo').value,
        stock: parseInt(document.getElementById('inventario-stock').value),
        costoUnitario: parseInt(document.getElementById('inventario-costo-unitario').value),
    };

    const success = await registrarInventario(inventarioData);

    if (success) {
        alert("¡Inventario actualizado con éxito!");
        inventarioForm.reset();
    } else {
        alert("Ocurrió un error al actualizar el inventario. Por favor, inténtalo de nuevo.");
    }

});

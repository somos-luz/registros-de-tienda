// --- Configuración Global ---
// Pega aquí la URL de tu aplicación web de Apps Script
const URL_DEL_SCRIPT = "https://script.google.com/macros/s/AKfycbyaeYOs9xAVjFSObEiYfOp1DlEkZqTffmxNMkT4iuTYWTggIKNtddrnaUZ5gXFLtX29jA/exec";

// --- Lógica de navegación entre pestañas ---
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetTab = link.getAttribute('data-tab');
        
        tabLinks.forEach(tab => tab.classList.remove('active'));
        link.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tab-link').click();
});

// --- Función para enviar datos a Google Sheets ---
async function enviarDatos(datos) {
    const params = new URLSearchParams({
        data: JSON.stringify(datos)
    });

    const response = await fetch(URL_DEL_SCRIPT, {
        method: "POST",
        body: params,
    });
    return response.ok;
}

// --- Lógica del formulario de ventas ---
const ventasForm = document.getElementById('ventas-form');

ventasForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ventaData = {
        formName: "Ventas",
        fecha: document.getElementById('venta-fecha').value,
        cliente: document.getElementById('venta-cliente').value,
        producto: document.getElementById('venta-producto').value,
        cantidad: parseInt(document.getElementById('venta-cantidad').value),
        precio: parseInt(document.getElementById('venta-precio').value),
        metodoPago: document.getElementById('venta-metodo').value,
        idVenta: new Date().getTime(),
    };

    const success = await enviarDatos(ventaData);

    if (success) {
        alert("¡Venta registrada con éxito!");
        ventasForm.reset();
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

    const success = await enviarDatos(gastoData);

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

    const success = await enviarDatos(inventarioData);

    if (success) {
        alert("¡Inventario actualizado con éxito!");
        inventarioForm.reset();
    } else {
        alert("Ocurrió un error al actualizar el inventario. Por favor, inténtalo de nuevo.");
    }
});

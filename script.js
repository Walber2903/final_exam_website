const packages = [];

// Add package to the list
function addPackage() {
    const recipientName = document.getElementById('recipientName').value.trim();
    const packageId = document.getElementById('packageId').value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
    const weight = parseFloat(document.getElementById('weight').value.trim());
    const errorElement = document.getElementById('error');
    errorElement.textContent = '';
    // Validation
    if (!/^[A-Za-z\s]+$/.test(recipientName)) {
        errorElement.textContent = 'Error: Recipient Name should contain only alphabetic characters.';
        return;
    }
    if (!/^\d+$/.test(packageId)) {
        errorElement.textContent = 'Error: Package ID should be numeric.';
        return;
    }
    if (deliveryAddress === '' || /\d/.test(deliveryAddress)) {
        errorElement.textContent = 'Error: Delivery Address cannot contain numbers or be empty.';
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        errorElement.textContent = 'Error: Weight must be a positive number.';
        return;
    }
    // Generate tracking code
    const trackingCode = generateTrackingCode(parseInt(packageId), Math.round(weight));
    // Add package to the list
    packages.push({ recipientName, packageId, deliveryAddress, weight, trackingCode });
    // Sort packages by weight
    packages.sort((a, b) => a.weight - b.weight);
    // Update the table
    updateTable();
    // clear input fields
    document.getElementById('packageForm').reset();
}

// Generate tracking code using bitwise operations
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
}

// Update the table
function updateTable() {
    const tableBody = document.getElementById('packageTableBody');
    tableBody.innerHTML = '';
    packages.forEach(pkg => {
        const row = `<tr>
            <td>${pkg.recipientName}</td>
            <td>${pkg.packageId}</td>
            <td>${pkg.deliveryAddress}</td>
            <td>${pkg.weight}</td>
            <td>${pkg.trackingCode}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
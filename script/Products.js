import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import $ from 'jquery';
const firebaseConfig = {
  apiKey: "AIzaSyCZ-hc_XbeZbfQhRebbxOoUKnW9LjV3K3E",
  authDomain: "possystem-67dd9.firebaseapp.com",
  projectId: "possystem-67dd9",
  storageBucket: "possystem-67dd9.appspot.com",
  messagingSenderId: "259843815223",
  appId: "1:259843815223:web:7a16f2e2ce1157d16d4cb2"
};

firebase.initializeApp(firebaseConfig);

// Firebase Database Reference
const productsRef = firebase.database().ref('products');

// Function to clear form inputs
function clearInputs() {
  $('#ProductsName').val('');
  $('#ProductCode').val('');
  $('#ProductsCategory').val('');
  $('#ProductsPrice').val('');
  $('#ProductsCost').val('');
  $('#ProductsBrand').val('');
  $('#ProductsQuantity').val('');
}

// Function to add a new product to Firebase
function addProduct() {
  const productName = $('#ProductsName').val();
  const code = $('#ProductCode').val();
  const category = $('#ProductsCategory').val();
  const price = $('#ProductsPrice').val();
  const quantity = $('#ProductsQuantity').val();
  
  productsRef.push({
    productName,
    code,
    category,
    price,
    quantity
  });
  
  clearInputs();
  $('#ProductsModal').modal('hide');
}

// Function to update an existing product in Firebase
function updateProduct(key) {
  const productName = $('#ProductsName').val();
  const code = $('#ProductCode').val();
  const category = $('#ProductsCategory').val();
  const price = $('#ProductsPrice').val();
  const quantity = $('#ProductsQuantity').val();
  
  productsRef.child(key).update({
    productName,
    code,
    category,
    price,
    quantity
  });
  
  clearInputs();
  $('#ProductsModal').modal('hide');
}

// Function to delete a product from Firebase
function deleteProduct(key) {
  productsRef.child(key).remove();
}

// Function to populate form inputs with existing product data
function populateInputs(key) {
  productsRef.child(key).once('value', function(snapshot) {
    const product = snapshot.val();
    $('#ProductsName').val(product.productName);
    $('#ProductCode').val(product.code);
    $('#ProductsCategory').val(product.category);
    $('#ProductsPrice').val(product.price);
    $('#ProductsQuantity').val(product.quantity);
  });
}

// Initialize the DataTable
function initDataTable() {
  $('#myTable').DataTable({
    data: [],
    columns: [
      { title: 'Product Name', data: 'productName' },
      { title: 'Code', data: 'code' },
      { title: 'Category', data: 'category' },
      { title: 'Price', data: 'price' },
      { title: 'Quantity', data: 'quantity' },
      {
        title: 'Actions',
        render: function(data, type, row, meta) {
          return '<button class="btn btn-sm btn-primary edit-btn" data-key="' + row.key + '">Edit</button> ' +
                 '<button class="btn btn-sm btn-danger delete-btn" data-key="' + row.key + '">Delete</button>';
        }
      }
    ]
  });
}

// Initialize the DataTable
initDataTable();

// Load products from Firebase and populate the DataTable
productsRef.on('value', function(snapshot) {
  const products = [];
  snapshot.forEach(function(childSnapshot) {
    const product = childSnapshot.val();
    product.key = childSnapshot.key;
    products.push(product);
  });
  
  $('#myTable').DataTable().clear().rows.add(products).draw();
});

// Event handler for the Add button
$('#add-btn').click(function() {
  $('#ProductsModal').find('.modal-title').text('Add Product');
  $('#ProductsModal').find('.modal-footer .btn-primary').off('click').click(addProduct);
  $('#ProductsModal').modal('show');
});

// Event handler for the Edit button
$('#myTable').on('click', '.edit-btn', function() {
  const key = $(this).data('key');
  $('#ProductsModal').find('.modal-title').text('Edit Product');
  $('#ProductsModal').find('.modal-footer .btn-primary').off('click').click(function() {
    updateProduct(key);
  });
  populateInputs(key);
  $('#ProductsModal').modal('show');
});

// Event handler for the Delete button
$('#myTable').on('click', '.delete-btn', function() {
  const key = $(this).data('key');
  if (confirm('Are you sure you want to delete this product?')) {
    deleteProduct(key);
  }
});
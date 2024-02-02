const dropdownButtons = document.querySelectorAll('.dropbtn');

dropdownButtons.forEach(function(button, index) {
 
  const dropdownContentId = 'dropdown-content-' + index;
  const dropdownContent = document.createElement('div');
  dropdownContent.id = dropdownContentId;
  dropdownContent.className = 'dropdown-content';


button.parentNode.appendChild(dropdownContent);

  
  for (let i = 1; i <= 20; i++) {
    const div = document.createElement('div');
    div.textContent = i;

    div.onclick = function() {

      const Itembox = this.closest('.box');
      const addToCartButton = Itembox.querySelector('.add_btn');
      const editButton = Itembox.querySelector('.edit_btn');

      if(addToCartButton)
      addToCartButton.setAttribute('data-quantity', this.textContent);

      if(editButton)
      editButton.setAttribute('data-quantity', this.textContent);

      button.textContent = `Quantity: ${this.textContent}`;
      dropdownContent.style.display = 'none';
    };
    dropdownContent.appendChild(div);
  }

  button.addEventListener('click', function() {

    const isDisplayed = dropdownContent.style.display === 'block';
   
    document.querySelectorAll('.dropdown-content').forEach(function(content) {
      content.style.display = 'none';
    });

   
    dropdownContent.style.display = isDisplayed ? 'none' : 'block';
  });
});


// JavaScript to create the dropdown menu
// const dropdownButtons = document.querySelectorAll('.dropbtn');

// dropdownButtons.forEach(function(button, index) {
//   // create a div content container that stores the 20 divs 
//   // Create a unique ID for each dropdown content based on the button index
//   // append the container to the parent node of each button
//   const dropdownContentId = 'dropdown-content-' + index;
//   const dropdownContent = document.createElement('div');
//   dropdownContent.id = dropdownContentId;
//   dropdownContent.className = 'dropdown-content';

// // Append dropdownContent to the .dropdown div
// // which is the parent of the button 
// button.parentNode.appendChild(dropdownContent);

//   // Populate each dropdown content with 20 divs
//   for (let i = 1; i <= 20; i++) {
//     const div = document.createElement('div');
//     div.textContent = i;
//     div.onclick = function() {
//       button.textContent = `Quantity: ${this.textContent}`;
//       dropdownContent.style.display = 'none';
//     };
//     dropdownContent.appendChild(div);
//   }

//   // Toggle the dropdown content when clicking the button
//   button.addEventListener('click', function() {
//     // Check if the dropdown content is already visible
//     // stores a condition
//     const isDisplayed = dropdownContent.style.display === 'block';
//     // Hide all dropdown contents
//     document.querySelectorAll('.dropdown-content').forEach(function(content) {
//       content.style.display = 'none';
//     });

//     // Toggle the current dropdown content visibility
//     // if display is true then display none, else display it
//     dropdownContent.style.display = isDisplayed ? 'none' : 'block';
//   });
// });

const filterButton = document.querySelector('.filterBtn');
const filterDC = document.querySelector('.filter-dropdown-content');
const filterOptions = document.querySelectorAll('.filter-dropdown-content div');

filterButton.addEventListener('click', function() {

    const isDisplayed = filterDC.style.display === 'block';

    filterDC.style.display = isDisplayed ? 'none' : 'block';
});

filterOptions.forEach(function(option,index){
    option.addEventListener('click', function() {
       
        filterButton.textContent = `${this.textContent}`;
        filterDC.style.display = 'none';
       

      });

});
   
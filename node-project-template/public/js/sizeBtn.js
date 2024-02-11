const sizeButton = document.querySelector('.sizeBtn');

  const sizeDC = document.createElement('div');
  sizeDC.className = 'size-dropdown-content';

  sizeButton.parentNode.appendChild(sizeDC);

  for (let i = 1; i <= 3; i++) {

    const div = document.createElement('div');

    if(i==1){
        div.textContent ="small";
    }
    else if(i==2){
        div.textContent ="medium";
    }
    else{
    div.textContent = "large";
    }

    div.onclick = function() {

      const Itembox = this.closest('.shirtBox');
      const addToCartButton = Itembox.querySelector('.add_btn');
      addToCartButton.setAttribute('data-size', this.textContent);

      sizeButton.textContent = `size: ${this.textContent}`;
      sizeDC.style.display = 'none';
    };
    sizeDC.appendChild(div);
  }


  sizeButton.addEventListener('click', function() {

    const isDisplayed = sizeDC.style.display === 'block';
   
    document.querySelectorAll('.size-dropdown-content').forEach(function(content) {
      content.style.display = 'none';
    });

    sizeDC.style.display = isDisplayed ? 'none' : 'block';
  });

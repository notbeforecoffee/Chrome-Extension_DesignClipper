import { useEffect, useState } from "react";

//TODO:  store information in the clipper, in case the extension is accidentally closed.

const useReloadFormData = () => {

  const [formData, setFormData] = useState<any>([])

  useEffect(() => {
    setFormData(window.localStorage.getItem ('formData'))
  }, [])

useEffect (() => {
  window.localStorage.setItem('formData', formData)
})


//     const keys: any = [
// 'name', 'sku', 'lifeStyleImageURLs', 'imageURLs', 'stockQty', 'casePackQty', 'tradePrice', 'height', 'width', 'length', 'weight', 'description', 'gtin', 'warrantyInfo', 'materials', 'careInfo', 'variants', 'colorName'
//     ];

//     document.addEventListener("DOMContentLoaded", function() {
//       chrome.storage.local.get(keys, function(data) {
//         /* find the form fields and set their state from data, for example 
//            (depends on the field type - maybe not .value) */
          
//             for (let key of keys) {
//               let field = document.getElementById(key);
//               field.value = data[key];
//               field.oninput = saveData;
//            }
      
//       });
//     })
    
//     function saveData(e) {
//       chrome.storage.local.set({[this.id]: this.value});
//     }
    
//     function clearData() { // To be called when you submit your data
//       chrome.storage.local.remove(keys);
//     }

}

export default useReloadFormData;
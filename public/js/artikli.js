const html = `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
1
</td>
<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
001
</td>
<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
Laptop
</td>
<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
  268,00
  </td>

<td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
<a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
</td>
</tr>

<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
2
</td>
<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
0015
</td>
<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
Desktop Pc
</td>
<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
  150,00
  </td>

<td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
<a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
</td>
</tr>`;
const brisanjeArtikla = (artikl) => {
  let cijeliArtikl = document.getElementById(`${artikl}`);
  cijeliArtikl.remove();
};

const sifra = document.getElementById("sifra");
const naziv = document.getElementById("naziv");
const cijena = document.getElementById("cijena");
const spremi = document.getElementById("spremi");
const tbody = document.getElementById("tbody");

let id = 1;
spremi.addEventListener("click", () => {
  if (sifra.value == "" || naziv.value == "" || cijena.value == "") {
    alert("Morate nešto upisati!");
  } else {
    const objekt = {
      sifra: sifra.value,
      naziv: naziv.value,
      cijena: cijena.value,
    };
    const trenutniId = id++;
    //Dodavanje  HTML-A
    tbody.innerHTML += `<tr id="artiklId${trenutniId}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    ${trenutniId}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    ${objekt.sifra}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    ${objekt.naziv}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
      ${objekt.cijena}
      </td>
    
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
    <a href="#" onclick="brisanjeArtikla(artiklId${trenutniId})" class="text-red-600 dark:text-red-600 hover:underline ">Delete</a>
    </td>
    </tr>
    
    `;
    modalHandler();
  }
});

// Başlangıç değişkenleri
var balance = 130; // Başlangıç bakiyesi
var selectedNumbers = []; // Seçilen sayıları saklar
var betAmount = 0; // Bahis miktarı

// Sayı seçme işlemi
document.getElementById("roulette-table").addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName === 'TH') {
    var number = target.textContent;
    if (target.classList.contains('selected')) {
      target.classList.remove('selected');
      selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
    } else {
      if (selectedNumbers.length < 7) {
        target.classList.add('selected');
        selectedNumbers.push(number);
      } else {
        alert('Maksimum 7 tane sayı seçebilirsiniz!');
      }
    }
  }
});

// Chip seçme işlemi
document.querySelectorAll('.chip').forEach(function(chip) {
  chip.addEventListener('click', function() {
    betAmount += parseInt(this.alt);
    document.getElementById('betAmount').value = betAmount;
  });
});

// Bahis miktarını doğrudan girme işlemi
document.getElementById("betAmount").addEventListener("input", function() {
  betAmount = parseInt(this.value);
});

// Çarkı döndürme
// Çarkı döndürme
// Çarkı döndürme
document.getElementById("spinButton").addEventListener("click", function() {
  if (selectedNumbers.length === 0) {
    alert('Lütfen bahis yapmak istediğiniz sayıları seçin!');
    return;
  }
  if (betAmount <= 0) {
    alert('Geçersiz bahis miktarı!');
    return;
  }
  if (betAmount > balance) {
    alert('Yetersiz bakiye!');
    return;
  }
  var wheel = document.getElementById('wheel');
  wheel.style.transition = 'none';
  wheel.style.transform = 'rotate(0deg)';
  var degree = Math.floor(Math.random() * 360);
  setTimeout(function() {
    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${degree + 1080}deg)`; // 1080 derece ekstra dönüş
    setTimeout(function() {
      var randomNumber = Math.floor(Math.random() * 37); // 0-36 arasında bir kazanan numara seç
      document.getElementById('winningNumber').textContent = "Kazanan Numara: " + randomNumber;
      var totalBet = selectedNumbers.length * betAmount;
      var winnings = 0;
      if (randomNumber === 0) { // 0 sayısı gelirse
        winnings = totalBet * 33;
      } else if (selectedNumbers.includes(randomNumber.toString())) { // Seçilen bir sayı gelirse
        winnings = betAmount * 20; // Sadece kazanan sayıya ödeme yap
      }
      balance -= totalBet; // Bahis miktarını bakiyeden düş
      balance += winnings; // Kazancı bakiyeye ekle
      balance = Math.max(balance, 0); // Bakiye eksiye düşmesin
      document.getElementById('balance').textContent = 'Bakiye: ' + balance;
      document.getElementById('winnings').textContent = 'Kazanç: ' + winnings;
      // Sayıların konumlarını resetleme
      document.querySelectorAll('.selected').forEach(function(cell) {
        cell.classList.remove('selected');
      });
      selectedNumbers = []; // Seçili sayıları sıfırla
      betAmount = 0; // Bahis miktarını sıfırla
      document.getElementById('betAmount').value = '';
    }, 5000);
  }, 100);
});
// Başlangıç formunu işleme
document.getElementById("startForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Formun otomatik olarak gönderilmesini engelle
  var startingBalance = parseInt(document.getElementById("startingBalance").value);
  if (isNaN(startingBalance) || startingBalance <= 0) {
    alert("Lütfen geçerli bir başlangıç bakiyesi girin!");
    return;
  }
  balance = startingBalance; // Başlangıç bakiyesini ayarla
  document.getElementById("balance").textContent = "Bakiye: " + balance;
  // Oyunu göster
  document.getElementById("startForm").style.display = "none";
  document.querySelector(".roulette-wheel").style.display = "block";
  document.getElementById("roulette-table").style.display = "table";
  document.querySelector(".betting-area").style.display = "block";
  document.querySelector(".chips").style.display = "block";
});
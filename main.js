
var p, a = 0, x, y, K
var content_1,content_2
// tính pow(a,b) mod n
function Pow_Mod(a, b, n) {
    res = 1
    while (b > 0) {
        if (b % 2 == 1) {
            res = res * a;
        }
        res = res % n;
        a = (a * a) % n;
        b = Math.floor(b / 2);

    }
    return res;
}
// tìm số nguyên tố
function isPrime(a) {
    for (i = 2; i <= Math.sqrt(a); i++) {
        if (a % i == 0) return false;
    }
    return a > 1;
}
// tạo ra một số ngẫu nhiên
function Random_Number(mi, ma) {
    return Math.floor(Math.random() * (ma - mi + 1) + mi);
}
// tìm ước chung lớn nhât
function gcd(a1, b) {
    if (b == 0) return a1
    return gcd(b, a1 % b)
}
// tính eculid mở rộng
function extended_Eculid(a, n) {
    let a1 = 1, a2 = 0, a3 = n
    let b1 = 0, b2 = 1, b3 = a
    while (true) {
        if (b3 == 1) {
            if (b2 > 0) return b2
            else return b2 + n
        }
        if (b3 == 0) return -1
        const q = Math.floor(a3 / b3)
        let r1 = a1 - b1 * q
        let r2 = a2 - b2 * q
        let r3 = a3 - b3 * q
        a1 = b1; a2 = b2; a3 = b3;
        b1 = r1; b2 = r2; b3 = r3;
    }
}
//tính phi hàm n
function eulerFunc(n) {
    let res = n
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            res = res - Math.floor(res / i)
            while (n % i == 0) {
                n = Math.floor(n / i)
            }
        }
    }
    if (n > 1) {
        res -= Math.floor(res / n)
    }
    return res
}

//căn nguyên thủy
function prim(a, n) {
    const phi = eulerFunc(n)
    const arr = new Array()
    for (let i = 1; i <= Math.floor(Math.sqrt(phi)) + 1; i++) {
        if (phi % i == 0) {
            if (i != Math.floor(phi / i)) {
                arr.push(i)
                arr.push(Math.floor(phi / i))
            } else {
                arr.push(i)
            }
        }
    }
    for (const nb of arr) {
        if (Pow_Mod(a, nb, n) == 1 && nb != phi) {
            return false
        }
    }
    return true
}
// Tạo khóa
function Create_Key() {
    do {
        p = Random_Number(7931, 12000);
    } while (!isPrime(p));
    x = Random_Number(0, p - 1)
    do {
        a++;
    } while (!prim(a, p));
    y = Pow_Mod(a, x, p)
    K = 0
    while (gcd(K, p - 1) != 1) {
        ++K;
    }
}
var pair = new Array();
// Tao chu ki so
function Encry_S(s) {
     while(pair.length)
        {
            pair.shift();
        }
    for (let i = 0; i < s.length; i++) {
        m = s.charCodeAt(i)
        s1 = Pow_Mod(a, K, p)
        s2 = extended_Eculid(K, p - 1) * (m - x * s1)
        s2 = (s2 % (p - 1) + p - 1) % (p - 1)
        pair.push([s1, s2])
    }
}

// Xac nhan chu ki so
function Decry_S(pair,s) {
    for (let i = 0; i < pair.length; i++) {
        s1 = pair[i][0]
        s2 = pair[i][1]
        m=s.charCodeAt(i)
        v1 = Pow_Mod(a, m, p)
        v2 = (Pow_Mod(y, s1, p) * Pow_Mod(s1, s2, p)) % p
        if (v1 != v2) return false
    }
    return true
}
Create_Key();
function ki() {
    let s
    do {
         s = document.getElementById("tao_chu_ki_so").value
        if (s ==="" && content_1==="") alert("Vui lòng nhập vào chữ kí")
        else {
            alert("Tạo chữ kí thành công")
            let myHash
            if (s!="")
             myHash = sha256Hash(s);
        else  myHash=sha256Hash(content_1)
            Encry_S(myHash)
            document.getElementById("chu_ki_so").value=pair;
        }
    } while (s === "" && content_1=="");
}
// Xác nhận chữ kí
 
function xac_nhan() {
    let s = document.getElementById("xac_nhan_chu_ki").value
    let myHash1
    if (s!="")
        myHash1 = sha256Hash(s);
    else myHash1=sha256Hash(content_2)
    if (Decry_S(pair,myHash1) == true) {
        alert("Chữ kí chính xác")
    }
    else {
        alert("Chữ kí không chính xác")
    }
}
// sử dụng hàm băm sha256
function sha256Hash(str) {
    return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}
function taokhoa()
{
    document.getElementById("p").value=p;
    document.getElementById("a").value=a;
    document.getElementById("x").value=x;
    document.getElementById("y").value=y;
}
document.getElementById('fileInput_1').addEventListener('change', function(event) {
    const file = event.target.files[0];  // Lấy file người dùng chọn
    const reader = new FileReader();     // Tạo một FileReader để đọc file

    reader.onload = function(e) {
         content_1 = e.target.result;   // Nội dung của file sau khi đọc
    };

    reader.readAsText(file);  // Đọc file dưới dạng text
});
document.getElementById('fileInput_2').addEventListener('change', function(event) {
    const file = event.target.files[0];  // Lấy file người dùng chọn
    const reader = new FileReader();     // Tạo một FileReader để đọc file

    reader.onload = function(e) {
         content_2 = e.target.result;   // Nội dung của file sau khi đọc
    };

    reader.readAsText(file);  // Đọc file dưới dạng text
});












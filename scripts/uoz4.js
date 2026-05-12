const linkBtns = document.querySelectorAll('.link-btn');
const fcInput = document.getElementById('fc_04');
const tuningInput = document.getElementById('tuning_04');
const dispFc = document.getElementById('disp_fc');
const dispUout = document.getElementById('disp_uout');

let activeLinks = new Set(['M']);

linkBtns.forEach(btn => {
    btn.onclick = () => {
        const link = btn.getAttribute('data-link');

        if (link === 'M' || link === 'C1') {
            
            if (activeLinks.has('C2') || activeLinks.has('C3')) activeLinks.clear();
            if (activeLinks.has(link)) {
                if (activeLinks.size > 1) activeLinks.delete(link); 
            } else {
                activeLinks.add(link);
            }
        } else {
            
            activeLinks.clear();
            activeLinks.add(link);
        }

        linkBtns.forEach(b => {
            b.classList.toggle('active', activeLinks.has(b.getAttribute('data-link')));
        });
        updateUos04();
    };
});

function updateUos04() {
    let fc = parseFloat(fcInput.value);
    let tuning = parseFloat(tuningInput.value);
    let u_out = 0;
    let currentLink = Array.from(activeLinks).sort().join('+');

    let peakPos = (fc - 390) * (85 - 65) / (1320 - 390) + 65; 
    
    let u_max = 0;
    if (currentLink === 'C1') u_max = 0.069 + (fc - 390) * (0.251 - 0.069) / (1350 - 390);
    if (currentLink === 'C2') u_max = 0.215 + (fc - 390) * (0.505 - 0.215) / (1021 - 390);
    if (currentLink === 'C3') u_max = 0.425 + (fc - 390) * (1.428 - 0.425) / (1320 - 390);
    if (currentLink === 'M')  u_max = 0.026 + (fc - 390) * (0.083 - 0.026) / (1021 - 390);
    if (currentLink === 'C1+M') u_max = 0.095 + (fc - 390) * (0.325 - 0.095) / (1320 - 390);

    let width = 15; 
    u_out = u_max * Math.exp(-Math.pow(tuning - peakPos, 2) / (2 * Math.pow(width, 2)));

    if (u_out < 0.001) u_out = 0;

    dispFc.innerText = fc.toFixed(1);
    dispUout.innerText = u_out.toFixed(3);
}

fcInput.oninput = updateUos04;
tuningInput.oninput = updateUos04;


updateUos04();

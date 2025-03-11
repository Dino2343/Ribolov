import { HttpService } from "./HttpService"


async function get(){

    try {
        const odgovor = await HttpService.get('/Riba');
        console.log('API odgovor:', odgovor); // Debug
        return odgovor; // axios vraća { data: [...], status: 200, ... }
    } catch (error) {
        console.error('Greška u dohvatu ribaova:', error);
        return { data: [] }; // vraćamo prazan niz kako bi izbjegli undefined error
    }
}

async function getBySifra(sifra){

    try {
        const odgovor = await HttpService.get('/Riba/'+sifra);
        console.log('API odgovor:', odgovor); // Debug
        return odgovor.data; // axios vraća { data: [...], status: 200, ... }
    } catch (error) {
        console.error('Greška u dohvatu ribaova:', error);
        return { data: [] }; // vraćamo prazan niz kako bi izbjegli undefined error
    }
}

async function dodaj(riba){
    return HttpService.post('/Riba',riba)
    .then(()=>{return {greska:false, poruka:'Dodano'}})
    .catch(()=>{return {greska:true, poruka: 'Problem kod dodavanja'}})
}

async function uredi(sifra, riba){
    return HttpService.put('/Riba/'+sifra,riba)
    .then(()=>{return {greska:false, poruka:'Uređeno'}})
    .catch(()=>{return {greska:true, poruka: 'Problem kod uređivanja'}})
}

async function obrisi(sifra){
    return HttpService.delete('/Riba/'+sifra)
    .then(()=>{return {greska:false, poruka:'Obrisano'}})
    .catch(()=>{return {greska:true, poruka: 'Problem kod uređivanja'}})
}

export default {
    get,
    getBySifra,
    uredi,
    obrisi,
    dodaj
}
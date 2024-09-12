class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana2', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas, carnivoro } = this.animais[animal];

        const recintosViaveis = this.recintos
            .filter(recinto => {
                if (!biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') return false;

                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * this.animais[a.especie].tamanho), 0);
                let espacoNecessario = quantidade * tamanho;
                let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
                console.log("recinto: ", recinto.numero, " numero: ", espacoDisponivel);

                if (carnivoro && recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== animal)) return false;

                if (recinto.animais.some(a => a.especie === 'HIPOPOTAMO') && !biomas.includes('savana e rio')) return false;

                return espacoDisponivel >= espacoNecessario;
            })
            .map(recinto => {
                let espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0);
                const espacoNecessario = quantidade * tamanho;
                
                const primeiraEspecie = recinto.animais.length > 0 ? recinto.animais[0].especie : null;
                console.log("recinto: ", recinto.numero);
                console.log("primeiraEspecie: ", primeiraEspecie);
                console.log("animal: ", animal);
                if (recinto.animais.length > 0 && primeiraEspecie !== animal) {
                    espacoOcupado += 1;
                    
                }    
                let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
                espacoDisponivel -= espacoNecessario;
                
                return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanhoTotal})`;
            });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };

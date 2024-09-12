const { select, input, checkbox } = require('@inquirer/prompts')

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:" })

    if(!meta.length) {
        console.log("A meta não pode ser vazia!")
        return
    }

    metas.push({ value: meta, checked: false })
}

const listarMetas = async () => {
    if(!metas.length) {
        console.log("Nenhuma meta foi cadastrada!")
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espeaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if(!respostas.length) {
        console.log("Nenhuma meta foi selecionada!")
        return
    }

    metas.forEach(meta => {
        if(meta.checked) {
            meta.checked = false
        }
    })
    

    respostas.forEach(resposta => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter(meta => meta.checked)

    if(!realizadas.length) {
        console.log("Não existem metas realizadas!")
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {

    while(true) {
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizada"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizada":
                await metasRealizadas()
                break
            case "sair":
                return
        }
    }
}

start()
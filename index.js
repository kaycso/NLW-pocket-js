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

    metas.forEach(meta => meta.checked = false)

    if(!respostas.length) {
        console.log("Nenhuma meta foi selecionada!")
        return
    }

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

const metasAbertas = async () => {
    const abertas = metas.filter(meta => !meta.checked)

    if(!abertas.length){
        console.log("Não existem metas abertas")
        return
    }

    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
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
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
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
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                return
        }
    }
}

start()
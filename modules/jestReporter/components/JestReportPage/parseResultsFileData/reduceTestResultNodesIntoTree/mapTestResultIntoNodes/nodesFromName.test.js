import nodesFromName from './nodesFromName'

it('should create nested node names', () => {
    const name ="today I saw a dog"
    const expectedNodes = [
        "today",
        "today I",
        "today I saw",
        "today I saw a",
        "today I saw a dog",
    ]
    expect(nodesFromName(name)).toStrictEqual(expectedNodes)
})


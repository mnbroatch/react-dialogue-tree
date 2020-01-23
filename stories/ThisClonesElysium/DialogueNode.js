const DialogueNode = ({ customScripts, customComponents, makeChoice, ...node }) => {
  const { gameState, dispatch } = useContext(GameStateContext)

  // Maybe premature optimization. Need to add dynamic chosenChoice to frozen-in-time processedNodeRef
  const processedNodeLazy = useMemo(() => processPassiveChecks(node, customScripts, gameState), [])
  const processedNodeRef = useRef(processedNodeLazy)
  const processedNode = processedNodeRef.current
    ?  { ...processedNodeRef.current, chosenChoice: node.chosenChoice }
    : node

  const makeChoiceWithActiveSkillCheck = useCallback((choice) => {
    if (!choice.activeCheck) return makeChoice(choice)

    const { base, modifiersTotal, passed } = performSkillCheck(customScripts, choice.activeCheck, gameState, true)

    dispatch({
      type: 'attemptActiveCheck',
      payload: {
        skillCheck: choice.activeCheck,
        skillLevel: base + modifiersTotal
      }
    })

    const next = passed ? choice.activeCheck.pass : choice.activeCheck.fail
    makeChoice({ ...choice, next })
  }, [])

  const choices = determineChoicesToDisplay(processedNode.choices, processedNode.chosenChoice, processedNode.next)
  const isHistory = !!processedNode.chosenChoice

  return (
    <div className='dialogue-node'>
      {processedNode.character && <><span className='dialogue-node__character'>{processedNode.character}</span> - </>}
      {processedNode.text}
      {choices && choices.map((choice, index) => {
        const isLocked = !isHistory && choice.activeCheck && isSkillCheckLocked(choice.activeCheck, gameState, customScripts)
        return (
          <div
            key={index}
            className='dialogue-node__choice'
            onClick={!isHistory && !isLocked ? () => { makeChoiceWithActiveSkillCheck(choice) } : undefined}
          >
            {isLocked && <span className='dialogue-node__locked'>[Locked] </span>}
            {isHistory && <><span className='dialogue-node__character'>You</span> - </>}
            {choice.text}
          </div>
        )
      })}

      {processedNode.next && !choices && (
        <div
          className='dialogue-node__default-choice'
          onClick={!isHistory ? () => { makeChoiceWithActiveSkillCheck({ text: 'Continue', next: processedNode.next, isDefault: true }) } : undefined}
        >
          Continue
        </div>
      )}
    </div>
  )
}

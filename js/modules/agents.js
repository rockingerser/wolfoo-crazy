var agentHTML = `
    <img class="wolfoo-character-avatar non-grabbable" draggable="false">
    <span class="wolfoo-character-name non-grabbable"></span>
    <progress class="wolfoo-character-health" value="1"></progress>
`;
// Is not necessary to add "non-grabbable" class on progress element because i disabled grabbing on these, because if agents try to grab one of these, the script crashes
export default agentHTML;

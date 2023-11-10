export default function loadQueryResults(ok, results) {
  if (ok) {
    const wrapper = document.getElementById('dashboard-query-results-wrapper');
    wrapper.innerHTML = '';

    results.forEach((e) => {
      // wrapper
      console.log(e);
      const { nome, posicao } = e;
      console.log(nome);
      console.log(posicao);

      const result = document.createElement('div');
      result.classList.add('dashboard-query-result');
      // name
      const name = document.createElement('div');
      name.classList.add('dashboard-query-result-name');
      name.innerHTML = nome;
      // main position
      const position = document.createElement('div');
      position.classList.add('dashboard-query-result-position');
      position.innerHTML = posicao;

      result.appendChild(name);
      result.appendChild(position);

      wrapper.appendChild(result);
    });
  }
  console.log('chamado no fim');
}

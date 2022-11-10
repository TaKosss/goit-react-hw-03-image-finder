export default Loader = ({ onSubmit }) => {
  return (
    <header class="searchbar">
      <form class="form">
        <button type="submit" class="button" onSubmit={onSubmit}>
          <span class="button-label">Search</span>
        </button>

        <input
          class="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

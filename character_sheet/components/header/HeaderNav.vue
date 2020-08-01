<template>
	<div>
		<nav>
			<ul>
				<li>
					<nuxt-link to="/character/cthulhu6">リンク1</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/login">リンク2</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/character/cthulhu6/Pc9AHy7IL4pYWpo1IOn2">リンク3</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/link04">リンク4</nuxt-link>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
	export default {
		components: {}
	};
</script>
<style>
nav {
	color: #fff;
}
ul {
  display: flex;
  justify-content: flex-end;
}
li {
  list-style-type: none;
  margin-left: 15px;
}
a {
  color: #fff;
}
</style>

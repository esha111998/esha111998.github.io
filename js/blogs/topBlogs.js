function getTopBlogsContent() {
  const { cityOrLinkName } = getPathAndLocation();
  const revisedBlogs = [];

  for (let i = 0; i < blogsData.length - 1; i++) {
    if (blogsData[i].route === cityOrLinkName) {
      continue;
    } else revisedBlogs.push(blogsData[i]);
  }

  return `
          <aside class="flex-div col-div" id="top-blogs-section">
            <h2 style="text-align: center;">Top Blogs</h2>
            <div class="flex-div col-div" style="flex: 0 0 100%; gap: 20px; align-items: unset;">
              ${revisedBlogs
                .map((blog) => {
                  return `
                  <a href="https://www.daynightpackersmovers.com/${blog.route}.html">
                    <div class="flex-div row-div" style="flex: 0 0 100%; gap: 20px; justify-content: unset;">
                      <img src="assets/${blog.imgName}.webp" alt="${blog.imgAlt}" width="100px" height="70px" style="object-fit: cover; text-align: left;"></img>
                      <div style="font-size: 16px; text-align: left;">
                        <p style="margin-bottom: 5px;">${blog.title}</p>
                        <p>${blog.date}</p>
                      </div>
                    </div>
                  </a>
              `;
                })
                .join("")}
            </div>
          </aside>
      `;
}

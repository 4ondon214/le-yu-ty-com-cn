// assets/content-map.js
// Site content partition and keyword tag management

const siteConfig = {
  baseUrl: "https://le-yu-ty.com.cn",
  siteName: "乐鱼体育",
  defaultLang: "zh-CN"
};

const contentPartitions = [
  {
    id: "home",
    title: "首页",
    path: "/",
    tags: ["乐鱼体育", "首页", "推荐"],
    description: "平台首页，展示热门内容"
  },
  {
    id: "live",
    title: "直播",
    path: "/live",
    tags: ["乐鱼体育", "直播", "体育赛事"],
    description: "实时体育赛事直播"
  },
  {
    id: "video",
    title: "视频",
    path: "/video",
    tags: ["乐鱼体育", "视频", "回放", "集锦"],
    description: "比赛回放与精彩集锦"
  },
  {
    id: "news",
    title: "新闻",
    path: "/news",
    tags: ["乐鱼体育", "新闻", "资讯"],
    description: "体育新闻与最新资讯"
  },
  {
    id: "stats",
    title: "数据",
    path: "/stats",
    tags: ["乐鱼体育", "数据", "统计", "分析"],
    description: "球队与运动员数据统计"
  },
  {
    id: "community",
    title: "社区",
    path: "/community",
    tags: ["乐鱼体育", "社区", "讨论"],
    description: "用户讨论与互动社区"
  }
];

const keywordTags = [
  { keyword: "乐鱼体育", related: ["平台", "体育", "直播"] },
  { keyword: "足球", related: ["英超", "西甲", "欧冠"] },
  { keyword: "篮球", related: ["NBA", "CBA", "季后赛"] },
  { keyword: "网球", related: ["大满贯", "ATP", "温网"] }
];

function searchContent(partitions, query) {
  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const partition of partitions) {
    const matchTitle = partition.title.toLowerCase().includes(lowerQuery);
    const matchTags = partition.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const matchDesc = partition.description.toLowerCase().includes(lowerQuery);

    if (matchTitle || matchTags || matchDesc) {
      results.push({
        id: partition.id,
        title: partition.title,
        url: siteConfig.baseUrl + partition.path,
        tags: partition.tags,
        score: (matchTitle ? 3 : 0) + (matchTags ? 2 : 0) + (matchDesc ? 1 : 0)
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

function getPartitionsByTag(tag) {
  const lowerTag = tag.toLowerCase();
  const result = [];
  for (const partition of contentPartitions) {
    if (partition.tags.some(t => t.toLowerCase() === lowerTag)) {
      result.push(partition);
    }
  }
  return result;
}

function expandKeyword(keyword) {
  for (const entry of keywordTags) {
    if (entry.keyword === keyword) {
      return entry.related;
    }
  }
  return [];
}

function buildSiteMap(partitions) {
  const map = {};
  for (const partition of partitions) {
    map[partition.id] = {
      title: partition.title,
      url: siteConfig.baseUrl + partition.path,
      tags: partition.tags.slice()
    };
  }
  return map;
}

function renderSearchResults(query) {
  const results = searchContent(contentPartitions, query);
  if (results.length === 0) {
    return `<p>未找到与 "${query}" 相关的内容</p>`;
  }
  let html = `<ul class="search-results">`;
  for (const item of results) {
    html += `<li><a href="${item.url}">${item.title}</a> <span class="tags">[${item.tags.join(", ")}]</span></li>`;
  }
  html += `</ul>`;
  return html;
}

function initContentMap() {
  console.log("[ContentMap] Initialized with baseUrl:", siteConfig.baseUrl);
  console.log("[ContentMap] Total partitions:", contentPartitions.length);
  console.log("[ContentMap] Keyword tags:", keywordTags.length);
}

export {
  siteConfig,
  contentPartitions,
  keywordTags,
  searchContent,
  getPartitionsByTag,
  expandKeyword,
  buildSiteMap,
  renderSearchResults,
  initContentMap
};
export default class Comments {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u3kMo3USGikpAtnmpKBQ/comments'

  static postComment = async (id, username, comment) => {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-type': 'application/JSON' },
      body: JSON.stringify({ item_id: id, username, comment }),
    });

    const data = await res.text();
    return data;
  }

  static fetchComment = async (id) => {
    const res = await fetch(`${this.url}?item_id=${id}`);
    const data = await res.json();
    return data;
  }

  static countFn = (data) => {
    let count = 0;
    for (let i = 0; i < data.length; i += 1) {
      count += 1;
    }
    return count;
  }
}

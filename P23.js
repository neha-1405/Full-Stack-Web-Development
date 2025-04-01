const request = require(&quot;supertest&quot;);
const app = require(&quot;../server&quot;);

describe(&quot;Task API Endpoints&quot;, () =&gt; {
let taskId;

   task&quot;, async () =&gt; {
        const res = await request(app)
            .post(&quot;/tasks&quot;)
            .send({ title: &quot;Test Task&quot;, description: &quot;This is a test task&quot; });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty(&quot;id&quot;);
        expect(res.body.title).toBe(&quot;Test Task&quot;);

        taskId = res.body.id;
    });

   
    it(&quot;should retrieve all tasks&quot;, async () =&gt; {
        const res = await request(app).get(&quot;/tasks&quot;);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    it(&quot;should update a task&quot;, async () =&gt; {
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .send({ title: &quot;Updated Task&quot;, description: &quot;Updated description&quot; });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(&quot;Updated Task&quot;);
    });

    it(&quot;should delete a task&quot;, async () =&gt; {
        const res = await request(app).delete(`/tasks/${taskId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty(&quot;message&quot;, &quot;Task deleted&quot;);
    });
});

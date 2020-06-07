<h1 align="center">BlazeReact</h1>
<div align="center">
    Use React.js More convenient
</div>

## 📦 Install

```bash
npm install blazereact
```

```bash
yarn add blazereact
```

## 🔨 Usage

```jsx
import { useBlaze, BlazeComponent } from 'blazereact';
const BInput = useBlaze("input");
const BSelect = useBlaze("select");

export default class App extends BlazeComponent {
    constructor(props) {
        super(props)
    }

    data() {
        return {
            count: 0,
            formdata: {
                name: "name",
                pass: "pass",
                sex: "",
            },
        }
    }

    click() {
        this.$data.count += 1;
    }

    render() {
        return (
            <div style={{ width: "200px", margin: "0 auto" }}>
                <BInput model={this.model("formdata.name")} placeholder="UserName" />
                <BInput model={this.model("formdata.pass")} placeholder="Password" />
                <BSelect model={this.model("formdata.sex")}>
                    <option value="">unknown</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </BSelect>

                <div>Username:{this.$data.formdata.name}</div>
                <div>Password:{this.$data.formdata.pass}</div>
                <div>Sex:{this.$data.formdata.sex}</div>
                <div>you click:{this.$data.count}</div>
                <button onClick={() => { this.click() }}>click</button>
            </div>)
    }
}
```

### TypeScript
`BlazeReact` is written in TypeScript with complete definitions

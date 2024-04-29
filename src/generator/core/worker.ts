import { ProcessEnum } from ".";
import { createProjectBuilder } from "./craete-project";


self.onmessage = async function (event) {
    if (event.data.type === ProcessEnum.RUN) {
        try {
            self.postMessage({ type: ProcessEnum.START });
            const builder = createProjectBuilder()
            const result = await builder.generateProject(event.data.data, event.data.panoId)
            self.postMessage({
                type: ProcessEnum.END,
                result: result,
            });
        } catch (error) {
            self.postMessage({ type: ProcessEnum.ERROR })
        }
    }
}

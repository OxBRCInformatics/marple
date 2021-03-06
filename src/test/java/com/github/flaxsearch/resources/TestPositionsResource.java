package com.github.flaxsearch.resources;
/*
 *   Copyright (c) 2016 Lemur Consulting Ltd.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import com.github.flaxsearch.api.DocTermData;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.junit.ClassRule;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class TestPositionsResource extends IndexResourceTestBase {

    @ClassRule
    public static final ResourceTestRule resource = ResourceTestRule.builder()
            .addResource(new PositionsResource(() -> reader))
            .build();

    @Test
    public void testDocPostings() {
        DocTermData data = resource.client().target("/positions/field3/field/1").request()
                .get(DocTermData.class);

        assertThat(data).isNotNull();
    }

    @Test
    public void testPayloads() {
        DocTermData data = resource.client().target("/positions/payload/here/0").request().get(DocTermData.class);
        assertThat(data.positions).isNotEmpty();
        assertThat(data.positions.get(0).payload).isNotEmpty();
    }
}

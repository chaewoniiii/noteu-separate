package com.noteu.noteu.question.dto.response;

import com.noteu.noteu.subject.entity.Subject;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class GetAllResponseQuestionPostDTO {

    private Long questionPostId;

    private Long subjectId;

    private Long memberId;

    private String memberName;

    private String profile;

    private String questionPostTitle;

    private Long views;

    private Long commentCnt;

    private LocalDateTime createdAt;
}
